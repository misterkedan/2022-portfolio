
import { Tweenable } from './misc/Tweenable';

class Nav extends Tweenable {

	constructor() {

		super( document.querySelector( 'nav' ), 'flex' );

		this.back = this.get( '#back' );
		this.forward = this.get( '#forward' );
		this.menuButton = this.get( '#menu-button' );

	}

	setForward( isEnding ) {

		const DISABLED = 'disabled';
		if ( isEnding ) this.forward.classList.add( DISABLED );
		else this.forward.classList.remove( DISABLED );

	}

	//show() {

	//	this.isOpen = true;
	//	this.domElement.classList.add( 'open' );

	//}

	//hide() {

	//	this.isOpen = false;
	//	this.domElement.classList.remove( 'open' );

	//}

	//toggle() {

	//	if ( this.isOpen ) this.tweenOut();
	//	else this.tweenIn();

	//}







}

export { Nav };
