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

		this.tweenX = 10;

		[ ...this.spans, ...this.links ].forEach( item => {

			item.style.opacity = 0;
			item.style.transform = `translateX(${this.tweenX}rem)`;

		} );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 300,
			duration: 500,
			complete: this.completeTweenIn,
		} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: '',
				steps: 15,
				align: Textformer.align.LEFT,
				to: this.spansTexts[ i ],
				autoplay: false,
			} );

			const stagger = i * 100;

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

			const stagger = i * 100;

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
			easing: 'easeInQuad',
			duration: 300,
			complete: this.completeTweenOut,
		} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: this.spansTexts[ i ],
				to: ' ',
				align: Textformer.align.LEFT,
				steps: 15,
				autoplay: false,
			} );

			const stagger = i > 0 ? 100 + 50 * i : 0;

			this.tweeningOut.add( {
				targets: textformer,
				progress: 1,
			}, 0 );

			this.tweeningOut.add( {
				targets: span,
				opacity: 0,
				translateX: this.tweenX,
			}, stagger );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const textformer = new Textformer( {
				output: link,
				align: Textformer.align.LEFT,
				from: this.linksTexts[ i ],
				to: ' ',
				autoplay: false,
			} );

			const stagger = 100 + i * 50;

			this.tweeningOut.add( {
				targets: textformer,
				progress: 1,
			}, stagger * 0.4 );

			this.tweeningOut.add( {
				targets: link,
				opacity: 0,
				translateX: this.tweenX,
			}, stagger );

		} );

	}

}

export { LinksScreen };
