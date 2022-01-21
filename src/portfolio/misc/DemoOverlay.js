import anime from 'animejs';
import { Textformer } from 'textformer';
import { Tweenable } from './Tweenable';

class DemoOverlay extends Tweenable {

	constructor() {

		super( document.querySelector( '#demo-overlay' ), 'flex' );

		this.firstName = this.prepTextform( '#name-first' )[ 0 ];
		this.lastName = this.prepTextform( '#name-alias' )[ 0 ];
		this.job = this.prepTextform( '#vocation' )[ 0 ];
		this.demoLauncher = this.prepTextform( '#demo-launcher-link' )[ 0 ];

		this.links = Array.from(
			document.querySelectorAll( '.placeholder.demo-launch' )
		).reduce( ( object, element ) => {

			object[ element.parentElement.getAttribute( 'id' ) ] =
				element.getAttribute( 'href' );
			return object;

		}, {} );

		this.tweenX = 10;

	}

	setup( backwards ) {

		const tweenX = ( backwards ) ? - this.tweenX :  this.tweenX;

		this.setOpacity( this.domElement, 0 );
		this.setX( this.domElement, tweenX * 2 );
		this.setOpacity( this.demoLauncher.element, 0 );
		this.setX( this.demoLauncher.element, tweenX );

	}

	set( id ) {

		const link = this.links[ id ];
		if ( link ) this.demoLauncher.element.href = link;

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		const options = {
			autoplay: false,
			from: '',
			steps: 14,
			stagger: 6,
			align: Textformer.align.LEFT,
		};

		const textformers = [
			new Textformer( {
				...options,
				to: this.firstName.text,
				output: this.firstName.element,
				mode: Textformer.modes.REVERSE,
			} ),
			new Textformer( {
				...options,
				to: this.lastName.text,
				output: this.lastName.element,
				mode: Textformer.modes.EXPAND,
			} ),
			new Textformer( {
				...options,
				to: this.job.text,
				output: this.job.element,
			} )
		];

		this.tweeningIn = anime.timeline( {
			complete: this.completeTweenIn,
			duration: 700,
			delay: 150,
			easing: 'easeOutCirc',
		} )
			.add( {
				targets: this.domElement,
				opacity: 1,
				translateX: 0,
			}, 0 )
			.add( {
				targets: this.demoLauncher.element,
				opacity: 1,
				translateX: 0,
			}, 0 )
			.add( {
				targets: textformers,
				progress: 1
			}, 100 )
		;

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const tweenX = ( backwards ) ? this.tweenX : - this.tweenX;

		const options = {
			autoplay: false,
			to: '',
			mode: ( backwards )
				? Textformer.modes.BASIC
				: Textformer.modes.REVERSE,
			align: Textformer.align.LEFT,
		};

		const textformers = [
			new Textformer( {
				...options,
				from: this.firstName.text,
				output: this.firstName.element,
				//mode: Textformer.modes.REVERSE,
			} ),
			new Textformer( {
				...options,
				from: this.lastName.text,
				output: this.lastName.element,
				//mode: Textformer.modes.EXPAND,
			} ),
			new Textformer( {
				...options,
				from: this.job.text,
				output: this.job.element,
			} )
		];

		this.tweeningOut = anime.timeline( {
			complete: this.completeTweenOut,
			duration: 300,
			easing: 'easeInOutQuad'
		} )
			.add( {
				targets: textformers,
				progress: 1
			}, 0 )
			.add( {
				targets: this.domElement,
				opacity: 0,
				translateX: tweenX * 2,
			}, 50 )
			.add( {
				easing: 'easeOutQuad',
				targets: this.demoLauncher.element,
				opacity: 0,
				translateX: tweenX,
			}, 50 )
		;

	}

}

export { DemoOverlay };
