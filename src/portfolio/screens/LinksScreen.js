import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class LinksScreen extends Screen {

	constructor( sketch ) {

		super( 'contact', sketch );

		this.spans = Array.from( this.domElement.getElementsByTagName( 'span' ) );
		this.spansTexts = this.spans.map( span => span.innerText );

		this.links = Array.from( this.domElement.getElementsByTagName( 'a' ) );
		this.linksTexts = this.links.map( link => link.innerText );

		this.tweenX = 100;

		[ ...this.spans, ...this.links ].forEach( item => {

			item.style.opacity = 0;
			item.style.transform = `translateX(${this.tweenX}px)`;

		} );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 400,
			duration: 700,
			complete: this.completeTweenIn,
		} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: '',
				steps: 15,
				to: this.spansTexts[ i ],
				autoplay: false,
			} );

			const stagger = i * 150;

			this.tweeningIn.add( {
				targets: textformer,
				progress: 1,
			}, stagger );

			this.tweeningIn.add( {
				targets: span,
				opacity: 1,
				translateX: 0,
			}, stagger );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const textformer = new Textformer( {
				output: link,
				from: ' ',
				steps: 15,
				to: this.linksTexts[ i ],
				mode: Textformer.modes.REVERSE,
				autoplay: false,
			} );

			const stagger = i * 150;

			this.tweeningIn.add( {
				targets: textformer,
				progress: 1,
			}, stagger );

			this.tweeningIn.add( {
				targets: link,
				opacity: 1,
				translateX: 0,
			}, stagger );

		} );

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			complete: this.completeTweenOut,
		} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: this.spansTexts[ i ],
				to: '',
				align: Textformer.align.LEFT,
				autoplay: false,
			} );

			const duration = i * 250;

			this.tweeningOut.add( {
				duration,
				targets: textformer,
				progress: 1,
			}, 0 );

			this.tweeningOut.add( {
				duration,
				targets: span,
				opacity: 0,
				translateX: this.tweenX,
			}, 0 );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const textformer = new Textformer( {
				output: link,
				from: this.linksTexts[ i ],
				to: '',
				autoplay: false,
			} );

			const duration = i * 250;

			this.tweeningOut.add( {
				duration,
				targets: textformer,
				progress: 1,
			}, 0 );

			this.tweeningOut.add( {
				duration,
				targets: link,
				opacity: 0,
				translateX: this.tweenX,
			}, 0 );

		} );

	}

}

export { LinksScreen };
