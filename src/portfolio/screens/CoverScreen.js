import anime from 'animejs';
import { Screen } from './Screen';

class CoverScreen extends Screen {

	constructor( sketch, nav ) {

		super( 'cover', sketch );

		this.nav = nav;

		this.invitation = document.getElementById( 'invitation' );
		this.invitationText = this.invitation.innerText;

		this.footer = document.getElementsByTagName( 'footer' )[ 0 ];

		const translate = 4;
		this.translate = translate;
		this.nav.back.style.transform = `translateX(-${translate}rem)`;
		this.nav.forward.style.transform = `translateX(${translate}rem)`;
		this.nav.domElement.style.transform = `translateY(-${translate}rem)`;
		this.footer.style.bottom = `-${translate}rem`;

		this.nav.domElement.style.opacity = 0;
		this.footer.style.opacity = 0;

		const initialHash = window.location.hash;
		if ( ! initialHash.length || initialHash === '#cover' ) this.show();

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 500,
			complete: this.completeTweenIn,
		} )
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
				bottom: - this.translate,
			}, 0 )
		;

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 300,
			complete: this.completeTweenOut,
		} )
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
				bottom: 0,
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
