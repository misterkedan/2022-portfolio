import { Textformer } from 'textformer';
import { Screen } from './Screen';

class ContactScreen extends Screen {

	constructor( sketch ) {

		super( 'contact', sketch );

		this.spans = this.prepTextform( 'span' );
		this.links = this.prepTextform( 'a' );

		this.offsetX = 10;

		const setup = ( item ) => {

			this.setOpacity( item.element, 0 );
			this.setX( item.element, this.offsetX );

		};

		this.spans.forEach( span => setup( span ) );
		this.links.forEach( link => setup( link ) );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = this.animeIn();

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const stagger = i * 100;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					output: span.element,
					from: '',
					steps: 15,
					align: Textformer.align.LEFT,
					to: span.text,
				} ),
				progress: 1,
			}, stagger );

			this.tweeningIn.add( {
				targets: span.element,
				opacity: 1,
				translateX: 0,
			}, stagger );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const stagger = i * 100;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					output: link.element,
					from: ' ',
					steps: 15,
					to: link.text,
					mode: Textformer.modes.REVERSE,
				} ),
				progress: 1,
			}, stagger );

			this.tweeningIn.add( {
				targets: link.element,
				opacity: 1,
				translateX: 0,
			}, stagger );

		} );

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = this.animeOut();

		const translateX = this.offsetX;

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const stagger = i > 0 ? 100 + 50 * i : 0;

			this.tweeningOut.add( {
				targets: Textformer.build( {
					output: span.element,
					from: span.text,
					to: '',
					align: Textformer.align.LEFT,
					steps: 15,
				} ),
				progress: 1,
			}, 0 );

			this.tweeningOut.add( {
				targets: span.element,
				opacity: 0,
				translateX,
			}, stagger );

		} );

		Object.entries( this.links ).forEach( ( [ i, link ] ) => {

			const stagger = 100 + i * 50;

			this.tweeningOut.add( {
				targets: Textformer.build( {
					output: link.element,
					align: Textformer.align.LEFT,
					from: link.text,
					to: '',
				} ),
				progress: 1,
			}, stagger * 0.4 );

			this.tweeningOut.add( {
				targets: link.element,
				opacity: 0,
				translateX,
			}, stagger );

		} );

	}

}

export { ContactScreen };
