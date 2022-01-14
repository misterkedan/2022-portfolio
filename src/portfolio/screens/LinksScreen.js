import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class LinksScreen extends Screen {

	constructor( sketch, ui ) {

		super( 'links', sketch );

		this.ui = ui;

		this.spans = Array.from( this.domElement.getElementsByTagName( 'span' ) );
		this.spansTexts = this.spans.map( span => span.innerText );

		this.links = Array.from( this.domElement.getElementsByTagName( 'a' ) );
		this.linksTexts = this.links.map( link => link.innerText );

		this.translation = 100;

		this.items = Array.from( this.domElement.getElementsByTagName( 'li' ) );
		this.items.forEach( item => {

			item.style.opacity = 0;
			item.style.transform = `translateX(${this.translation}px)`;

		} );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 400,
			duration: 500,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.ui.forward,
				opacity: 0,
			} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: '',
				to: this.spansTexts[ i ],
				align: Textformer.align.LEFT,
				autoplay: false,
			} );

			const stagger = i * 150;

			this.tweeningIn.add( {
				targets: textformer,
				progress: 1,
			}, stagger );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const textformer = new Textformer( {
				output: link,
				from: '',
				to: this.linksTexts[ i ],
				mode: Textformer.modes.REVERSE,
				autoplay: false,
			} );

			const stagger = 150 + i * 150;

			this.tweeningIn.add( {
				targets: textformer,
				progress: 1,
			}, stagger );

		} );

		Object.entries( this.items ).forEach( ( [ i, item ] ) => {

			this.tweeningIn.add( {
				targets: item,
				opacity: 1,
				translateX: 0,
			}, 300 + i * 150 );

		} );

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 500,
			complete: this.completeTweenOut,
		} )
			.add( {
				targets: this.ui.forward,
				opacity: 1,
			} );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const textformer = new Textformer( {
				output: span,
				from: this.spansTexts[ i ],
				to: '',
				align: Textformer.align.LEFT,
				autoplay: false,
			} );

			const duration = i * 300;

			this.tweeningOut.add( {
				duration,
				targets: textformer,
				progress: 1,
			}, 0 );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const textformer = new Textformer( {
				output: link,
				from: this.linksTexts[ i ],
				to: '',
				autoplay: false,
			} );

			const duration = i * 300;

			this.tweeningOut.add( {
				duration,
				targets: textformer,
				progress: 1,
			}, 0 );

		} );

		Object.entries( this.items ).forEach( ( [ i, item ] ) => {

			this.tweeningOut.add( {
				targets: item,
				opacity: 0,
				translateX: this.translation,
			}, i * 150 );

		} );

	}

}

export { LinksScreen };
