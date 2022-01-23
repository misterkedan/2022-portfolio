import { Screen } from './Screen';

class CoverScreen extends Screen {

	constructor( sketch, nav, footer ) {

		super( 'cover', sketch );

		this.nav = nav;
		this.footer = footer;
		this.invitation = this.get( '#invitation' );

		this.gridOffset = sketch.tileSize * 15;

		const offset = 4;
		this.translate = offset;

		this.setX( nav.back, - offset );
		this.setX( nav.forward, offset );
		this.setY( nav.domElement, - offset );
		this.setY( footer, offset );

		this.setOpacity( nav.domElement, 0 );
		this.setOpacity( footer, 0 );

		const initialHash = window.location.hash;
		if ( ! initialHash.length || initialHash === '#cover' ) this.show();

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = this.animeIn( { delay: 0 } )
			.add( {
				duration: 1200,
				targets: this.sketch,
				offset: 0,
			}, 300 )
			.add( {
				targets: this.invitation,
				opacity: 1,
				translateX: 0,
			}, 300 )
			.add( {
				targets: this.nav.back,
				opacity: 0,
				translateX: this.translate,
			}, 0 )
			.add( {
				targets: this.nav.forward,
				opacity: 0,
				translateX: - this.translate,
			}, 0 )
			.add( {
				targets: this.nav.domElement,
				translateY: - this.translate,
				opacity: 0,
			}, 0 )
			.add( {
				targets: this.footer,
				opacity: 0,
				translateY: this.translate,
			}, 0 )
		;

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = this.animeOut()
			.add( {
				targets: this.sketch,
				offset: this.gridOffset,
			}, 0 )
			.add( {
				targets: this.invitation,
				opacity: 0,
				translateX: - 200,
			}, 0 )
			.add( {
				targets: this.nav.domElement,
				translateY: 0,
				opacity: 1,
			}, 200 )
			.add( {
				targets: this.footer,
				opacity: 1,
				translateY: 0,
			}, 200 )
			.add( {
				targets: this.nav.back,
				opacity: 1,
				translateX: 0,
			}, 150 )
			.add( {
				targets: this.nav.forward,
				opacity: 1,
				translateX: 0,
			}, 150 )
		;

	}

}

export { CoverScreen };
