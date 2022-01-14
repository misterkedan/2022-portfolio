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

	show() {

		this.domElement.style.display = this.displayType;

	}

	hide() {

		this.domElement.style.display = 'none';

	}

	setup() {

		// Setup for tween in subclasses

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

}

export { Tweenable };
