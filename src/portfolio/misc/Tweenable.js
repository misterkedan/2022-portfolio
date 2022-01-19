class Tweenable {

	constructor( domElement, displayType = 'block' ) {

		this.domElement = domElement;
		this.displayType = displayType;

		this.completeTweenIn = function () {

			if ( this.tweeningIn?.reversed ) this.hide();
			this.tweeningIn = null;

		}.bind( this );

		this.completeTweenOut = function () {

			if ( ! this.tweeningOut?.reversed  ) this.hide();
			this.tweeningOut = null;

		}.bind( this );

	}

	/*-------------------------------------------------------------------------/

		Init

	/-------------------------------------------------------------------------*/

	get( selector ) {

		return this.domElement.querySelector( selector );

	}

	getAll( selector ) {

		return Array.from( this.domElement.querySelectorAll( selector ) );

	}

	prepTextform( selector ) {

		return this.getAll( selector ).map( ( element ) => {

			return {
				element: element,
				text: element.innerText
			};

		} );

	}

	setup() {

		// Setup for tween in subclasses

	}

	/*-------------------------------------------------------------------------/

		Tween

	/-------------------------------------------------------------------------*/

	show() {

		this.domElement.style.display = this.displayType;

	}

	hide() {

		this.domElement.style.display = 'none';

	}

	tweenIn( backwards ) {

		if ( this.tweeningIn ) this.tweeningIn.pause();
		if ( this.tweeningOut ) {

			this.tweeningOut.pause();
			this.tweeningOut = null;

		}

		if ( ! this.tweeningIn && ! this.tweeningOut ) this.setup( backwards );
		this.show();

	}

	tweenOut() {

		if ( this.tweeningOut ) this.tweeningOut.pause();
		if ( this.tweeningIn ) {

			this.tweeningIn.pause();
			this.tweeningIn = null;

		}

	}

	setX( element, x ) {

		element.style.transform = `translateX(${x}rem)`;

	}

	setY( element, y ) {

		element.style.transform = `translateY(${y}rem)`;

	}

	setOpacity( element, opacity ) {

		element.style.opacity = opacity;

	}

}

export { Tweenable };
