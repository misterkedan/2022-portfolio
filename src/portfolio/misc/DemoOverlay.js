import { Textformer } from 'textformer';
import { Tweenable } from './Tweenable';

class DemoOverlay extends Tweenable {

	constructor() {

		super( '#demo-overlay' );

		this.title = this.get( 'h1' );

		this.firstName = this.prepTextform( '#name-first' );
		this.lastName = this.prepTextform( '#name-alias' );
		this.job = this.prepTextform( '#vocation' );

		this.demoLauncher = this.prepTextform( '#demo-launcher-link' );

		this.links = Array.from(
			document.querySelectorAll( '.placeholder.demo-launch' )
		).reduce( ( object, element ) => {

			object[ element.parentElement.getAttribute( 'id' ) ] =
				element.getAttribute( 'href' );
			return object;

		}, {} );

		this.offsetX = 20;

	}

	setup( backwards ) {

		const x = ( backwards ) ? - this.offsetX :  this.offsetX;

		this.setOpacity( this.title, 0 );
		this.setX( this.title, x );
		this.setOpacity( this.demoLauncher.element, 0 );
		this.setX( this.demoLauncher.element, x * 2 );

	}

	set( id ) {

		const link = this.links[ id ];
		if ( link ) this.demoLauncher.element.href = link;

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		const options = {
			from: '',
			steps: 14,
			stagger: 6,
			align: Textformer.align.LEFT,
		};

		const textforms = [
			Textformer.build( {
				...options,
				to: this.firstName.text,
				output: this.firstName.element,
				mode: Textformer.modes.REVERSE,
			} ),
			Textformer.build( {
				...options,
				to: this.lastName.text,
				output: this.lastName.element,
				mode: Textformer.modes.EXPAND,
			} ),
			Textformer.build( {
				...options,
				to: this.job.text,
				output: this.job.element,
			} )
		];

		this.tweeningIn = this.animeIn( {
			duration: 700,
			delay: 150,
		} )
			.add( {
				targets: this.title,
				opacity: 1,
				translateX: 0,
			}, 0 )
			.add( {
				targets: this.demoLauncher.element,
				opacity: 1,
				translateX: 0,
			}, 0 )
			.add( {
				targets: textforms,
				progress: 1
			}, 100 )
		;

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const translateX = ( backwards ) ? this.offsetX : - this.offsetX;

		const options = {
			to: '',
			mode: ( backwards )
				? Textformer.modes.BASIC
				: Textformer.modes.REVERSE,
			align: Textformer.align.LEFT,
		};

		const textforms = [
			Textformer.build( {
				...options,
				from: this.firstName.text,
				output: this.firstName.element,
			} ),
			Textformer.build( {
				...options,
				from: this.lastName.text,
				output: this.lastName.element,
			} ),
			Textformer.build( {
				...options,
				from: this.job.text,
				output: this.job.element,
			} )
		];

		this.tweeningOut = this.animeOut()
			.add( {
				targets: textforms,
				progress: 1
			}, 0 )
			.add( {
				targets: this.title,
				opacity: 0,
				translateX,
			}, 50 )
			.add( {
				easing: 'easeOutQuad',
				targets: this.demoLauncher.element,
				opacity: 0,
				translateX: translateX * 2,
			}, 50 )
		;

	}

}

export { DemoOverlay };
