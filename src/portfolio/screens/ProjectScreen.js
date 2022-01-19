import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class ProjectScreen extends Screen {

	constructor( id, sketch ) {

		super( id, sketch );

		this.video = this.get( 'video' );
		this.paragraphs = this.prepTextform( 'p' );
		this.links = this.prepTextform( 'a' );

		this.tweenX = 5;
		this.tweenY = 1;

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

		const tweenX = ( backwards ) ? - this.tweenX :  this.tweenX;

		const setStyle = ( element ) => {

			this.setOpacity( element, 0 );
			this.setX( element, tweenX );

		};

		setStyle( this.video );
		this.paragraphs.forEach( paragraph => setStyle( paragraph.element ) );
		this.links.forEach( link => setStyle( link.element ) );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		const tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 300,
			duration: 500,
			complete: this.completeTweenIn,
		} ).add( {
			targets: this.video,
			opacity: 1,
			translateX: 0,
		}, 0 )
		;
		this.tweeningIn = tweeningIn;

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 150;

			tweeningIn.add( {
				targets: new Textformer( {
					autoplay: false,
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

		};

		Object.entries( this.paragraphs ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		Object.entries( this.links ).forEach(
			( [ i, item ] ) => addTextformer( i, item, 150 )
		);

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const tweenX = ( backwards ) ? this.tweenX : - this.tweenX;

		const tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 300,
			complete: this.completeTweenOut,
		} ).add( {
			targets: this.video,
			opacity: 0,
			translateX: tweenX,
		}, 0 );

		this.tweeningOut = tweeningOut;

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 50;

			tweeningOut.add( {
				targets: new Textformer( {
					autoplay: false,
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
				translateX: tweenX,
			}, stagger );

		};

		Object.entries( this.paragraphs ).forEach(
			( [ i, item ] ) => addTextformer( i, item, 50 )
		);

		Object.entries( this.links ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

	}

}

export { ProjectScreen };
