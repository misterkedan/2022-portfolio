import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from '../screens/Screen';

class HomeScreen extends Screen {

	constructor( sketch, ui ) {

		super( { id: 'home', sketch, type: Screen.types.INTRO } );

		this.ui = ui;

		this.invitation = document.getElementById( 'invitation' );
		this.invitationText = this.invitation.innerText;

		this.nav = document.getElementsByTagName( 'nav' )[ 0 ];
		this.footer = document.getElementsByTagName( 'footer' )[ 0 ];

		this.translate = 30;

		this.setup();

	}

	setup() {

		this.show();

		const { translate } = this;
		this.nav.style.transform = `translateY(${translate}px)`;
		this.ui.back.style.transform = `translateX(${translate}px)`;
		this.ui.forward.style.transform = `translateX(-${translate}px)`;
		this.footer.style.bottom = `${translate}px`;

	}

	tweenIn() {

		if ( this.tweeningIn ) this.tweeningIn.pause();
		if ( this.tweeningOut ) {

			this.tweeningOut.pause();
			this.tweeningOut = null;

		}

		this.show();

		const complete = function () {

			if ( this.tweeningIn?.reversed ) this.hide();
			this.tweeningIn = null;

		}.bind( this );

		const invitation = new Textformer( {
			output: this.invitation,
			from: '',
			to: this.invitationText,
			autoplay: false,
		} );

		this.ui.setNav( false );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 700,
			complete,
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

		if ( this.tweeningOut ) this.tweeningOut.pause();
		if ( this.tweeningIn ) {

			this.tweeningIn.pause();
			this.tweeningIn = null;

		}

		const complete = function () {

			if ( ! this.tweeningOut?.reversed  ) this.hide();
			this.tweeningOut = null;

		}.bind( this );

		const invitation = new Textformer( {
			output: this.invitation,
			from: this.invitationText,
			to: '',
			autoplay: false,
		} );

		this.tweeningOut = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 700,
			complete,
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
				opacity: 1,
				translateX: 0,
			}, 600 )

		;

	}

}

export { HomeScreen };
