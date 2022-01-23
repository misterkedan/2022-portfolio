import { Textformer } from 'textformer';
import { Screen } from './Screen';

class ProjectScreen extends Screen {

	constructor( id, sketch ) {

		super( id, sketch );

		this.video = this.get( 'video' );
		this.paragraphs = this.prepTextform( 'p' );
		this.cta = this.prepTextform( '.cta' );

		this.offsetX = 5;
		this.offsetY = 1;

		this.setup();

	}

	show() {

		super.show();
		this.video.play();

	}

	hide() {

		super.hide();
		this.video.pause();

	}

	setup( backwards ) {

		const x = ( backwards ) ? - this.offsetX :  this.offsetX;

		const setStyle = ( element ) => {

			this.setOpacity( element, 0 );
			this.setX( element, x );

		};

		setStyle( this.video );
		this.paragraphs.forEach( paragraph => setStyle( paragraph.element ) );
		setStyle( this.cta.element );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		this.tweeningIn = this.animeIn().add( {
			targets: this.video,
			opacity: 1,
			translateX: 0,
		}, 0 );

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 150;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					align: Textformer.align.LEFT,
					steps: 30,
					stagger: 15,
					from: '',
					to: item.text,
					output: item.element,
				} ),
				progress: 1,
			}, stagger ).add( {
				targets: item.element,
				opacity: 1,
				translateX: 0,
			}, stagger );

		}.bind( this );

		Object.entries( this.paragraphs ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		addTextformer( 0, this.cta, 150 );

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const translateX = ( backwards ) ? this.offsetX : - this.offsetX;

		this.tweeningOut = this.animeOut().add( {
			targets: this.video,
			opacity: 0,
			translateX,
		}, 0 );

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 50;

			this.tweeningOut.add( {
				targets: Textformer.build( {
					align: Textformer.align.LEFT,
					steps: 30,
					stagger: 15,
					from: item.text,
					to: '',
					output: item.element,
				} ),
				progress: 1,
			}, stagger ).add( {
				targets: item.element,
				opacity: 0,
				translateX,
			}, stagger );

		}.bind( this );

		Object.entries( this.paragraphs ).forEach(
			( [ i, item ] ) => addTextformer( i, item, 50 )
		);

		addTextformer( 0, this.cta );

	}

}

export { ProjectScreen };
