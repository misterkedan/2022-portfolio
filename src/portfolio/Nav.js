import { Tweenable } from './misc/Tweenable';

class Nav extends Tweenable {

	constructor() {

		super( document.querySelector( 'nav' ), 'flex' );

		this.back = document.getElementById( 'back' );
		this.forward = document.getElementById( 'forward' );
		this.menuControl = document.getElementById( 'menu-control' );

		this.menu = document.getElementById( 'menu' );
		this.items = Array.from( this.menu.querySelectorAll( 'li' ) );

	}

	open() {

		this.isOpen = true;
		this.domElement.classList.add( 'open' );

	}

	close() {

		this.isOpen = false;
		this.domElement.classList.remove( 'open' );

	}

	toggle() {

		if ( this.isOpen ) this.close();
		else this.open();

	}

	update( hash ) {

		const item = this.items.filter(
			item => item.getAttribute( 'data-target' ) === hash
		).pop() || this.items[ 1 ];

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


}

export { Nav };
