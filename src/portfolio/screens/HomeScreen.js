import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from '../screens/Screen';

class HomeScreen extends Screen {

	constructor( sketch, portfolio ) {

		super( 'home', sketch );

		this.portfolio = portfolio;
		this.ui = portfolio.ui;

		this.invitation = document.getElementById( 'invitation' );
		this.invitationText = this.invitation.innerText;

		this.nav = document.getElementsByTagName( 'nav' )[ 0 ];
		this.footer = document.getElementsByTagName( 'footer' )[ 0 ];

		const translate = 20;
		this.nav.style.transform = `translateY(${translate}px)`;
		this.ui.back.style.transform = `translateX(${translate}px)`;
		this.ui.forward.style.transform = `translateX(-${translate}px)`;
		this.footer.style.bottom = `${translate}px`;
		this.translate = translate;

		const initialHash = window.location.hash;
		if ( ! initialHash.length || initialHash === '#home' ) this.show();

	}

	tweenIn() {

		super.tweenIn();

		const invitation = new Textformer( {
			output: this.invitation,
			from: '',
			to: this.invitationText,
			autoplay: false,
		} );

		//this.ui.setNav( false );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 700,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.ui.back,
				opacity: 0,
				translateX: this.translate,
			}, 100 )
			.add( {
				targets: this.ui.forward,
				opacity: 0,
				translateX: - this.translate,
			}, 100 )
			.add( {
				targets: this.nav,
				translateY: this.translate,
				opacity: 0,
			}, 300 )
			.add( {
				targets: this.footer,
				opacity: 0,
				bottom: this.translate,
			}, 300 )
			.add( {
				targets: this.invitation,
				opacity: 1,
				translateX: 0,
			}, 500 )
			.add( {
				targets: invitation,
				progress: 1,
			}, 700 );

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
				translateX: - 100,
			}, 200 )
			.add( {
				targets: this.nav,
				translateY: 0,
				opacity: 1,
			}, 400 )
			.add( {
				targets: this.footer,
				opacity: 1,
				bottom: 0,
			}, 400 )
			.add( {
				targets: this.ui.back,
				opacity: 1,
				translateX: 0,
			}, 600 )
			.add( {
				targets: this.ui.forward,
				opacity: ( this.portfolio.isEnding ) ? 0 : 1,
				translateX: 0,
			}, 600 )

		;

	}

}

export { HomeScreen };
