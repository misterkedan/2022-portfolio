import anime from 'animejs';
import { Textformer } from 'textformer';
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

		const invitation = new Textformer( {
			output: this.invitation,
			from: '',
			to: this.invitationText,
			autoplay: false,
		} );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 700,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.invitation,
				opacity: 1,
				translateX: 0,
			}, 500 )
			.add( {
				targets: invitation,
				progress: 1,
			}, 700 )
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

		const invitation = new Textformer( {
			output: this.invitation,
			from: this.invitationText,
			to: '',
			autoplay: false,
		} );

		this.tweeningOut = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 700,
			complete: this.completeTweenOut,
		} )
			.add( {
				targets: invitation,
				progress: 1,
			}, 0 )
			.add( {
				targets: this.invitation,
				opacity: 0,
				translateX: - 200,
			}, 200 )
			.add( {
				targets: this.nav.domElement,
				translateY: 0,
				opacity: 1,
			}, 400 )
			.add( {
				targets: this.footer,
				opacity: 1,
				bottom: 0,
			}, 400 )
			.add( {
				targets: this.nav.back,
				opacity: 1,
				translateX: 0,
			}, 600 )
			.add( {
				targets: this.nav.forward,
				opacity: 1,
				translateX: 0,
			}, 600 )

		;

	}

}

export { CoverScreen };
