import anime from 'animejs';
import { Textformer } from 'textformer';
import { Tweenable } from './misc/Tweenable';

class Nav extends Tweenable {

	constructor() {

		super( document.querySelector( 'nav' ), 'flex' );

		this.back = this.get( '#back' );
		this.forward = this.get( '#forward' );
		this.dropdownButton = this.get( '#dropdown-button' );

		this.container = this.get( '#dropdown-wrapper' );
		this.dropdown = this.get( '#dropdown' );
		this.items = this.prepTextform( 'li' );

		this.exceptions = {
			demos: 'navscan',
			infos: 'about-me',
		};

		this.items.forEach( item => {

			const text = item.text.toLowerCase();
			item.target = this.exceptions[ text ] || text.replaceAll( ' ', '-' );

		} );

	}

	show() {

		this.isOpen = true;
		this.domElement.classList.add( 'open' );

	}

	hide() {

		this.isOpen = false;
		this.domElement.classList.remove( 'open' );

	}

	toggle() {

		if ( this.isOpen ) this.tweenOut();
		else this.tweenIn();

	}


	update( hash ) {

		const filter = this.items.filter( item => item.target === hash );
		const item = filter.length ? filter.pop().element : this.items[ 0 ].element;

		const SELECTED = 'selected';
		this.currentItem?.classList.remove( SELECTED );
		item.classList.add( SELECTED );
		this.currentItem = item;

	}

	setForward( isEnding ) {

		const DISABLED = 'disabled';
		if ( isEnding ) this.forward.classList.add( DISABLED );
		else this.forward.classList.remove( DISABLED );

	}

	setup() {

		this.setOpacity( this.container, 0 );
		this.items.forEach( item => this.setOpacity( item.element, 0 ) );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			duration: 250,
			complete: this.completeTweenIn,
		} ).add( {
			targets: this.container,
			opacity: 1,
		} );

		Object.entries( this.items ).forEach( ( [ i, item ] ) => {

			const stagger = i * 30;

			this.tweeningIn.add( {
				targets: new Textformer( {
					autoplay: false,
					from: '',
					to: item.text,
					output: item.element,
				} ),
				progress: 1,
			}, 50 + stagger ).add( {
				targets: item.element,
				opacity: 1,
			}, stagger );

		} );

	}

	tweenOut() {

		super.tweenOut();

		this.hide();

	}


}

export { Nav };
