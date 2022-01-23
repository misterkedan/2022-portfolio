import { Textformer } from 'textformer';
import { AboutShuffler } from '../misc/AboutShuffler';
import { Screen } from '../screens/Screen';

class AboutScreen extends Screen {

	constructor( sketch ) {

		super( 'about-me', sketch );

		this.spans = this.prepTextform( 'span' );
		this.paragraphs = this.getAll( 'p' );
		this.selfie = this.get( '#selfie' );
		this.offsetX = 10;

		this.shuffler = new AboutShuffler();

	}

	show() {

		super.show();
		this.shuffler.enable();

	}

	hide() {

		super.hide();
		this.shuffler.disable();

	}

	setup( backwards ) {

		const x = ( backwards ) ? - this.offsetX : this.offsetX;

		const setStyle = ( element ) => {

			this.setOpacity( element, 0 );
			this.setX( element, x );

		};

		setStyle( this.selfie );
		this.paragraphs.forEach( paragraph => setStyle( paragraph ) );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		this.tweeningIn = this.animeIn().add( {
			targets: this.selfie,
			opacity: 1,
			translateX: 0,
		}, 100 );

		Object.entries( this.spans ).forEach( ( [ i, span ] ) => {

			const stagger = i * 50;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					output: span.element,
					from: '',
					to: span.text,
					mode: Textformer.modes.REVERSE,
					steps: 30,
					stagger: 30,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			}, stagger );

		} );

		Object.entries( this.paragraphs ).forEach( ( [ i, paragraph ] ) => {

			const stagger = 100 + i * 50;

			this.tweeningIn.add( {
				targets: paragraph,
				translateX: 0,
				opacity: 1
			}, stagger );

		} );

	}

	tweenOut( backwards ) {

		super.tweenOut();

		const translateX = ( backwards ) ? this.offsetX : - this.offsetX;

		this.tweeningOut = this.animeOut().add( {
			targets: this.selfie,
			opacity: 0,
			translateX,
		}, 0 );

		Object.values( this.spans ).forEach( ( span ) => {

			this.tweeningOut.add( {
				targets: Textformer.build( {
					output: span.element,
					from: span.text,
					to: '',
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			}, 0 );

		} );

		Object.values( this.paragraphs ).forEach( ( paragraph )  => {

			this.tweeningOut.add( {
				targets: paragraph,
				opacity: 0,
				translateX,
			}, 100 );

		} );

	}

}

export { AboutScreen };
