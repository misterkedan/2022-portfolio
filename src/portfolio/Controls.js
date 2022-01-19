class Controls {

	constructor( portfolio ) {

		this.init( portfolio );
		this.initButtons( portfolio );
		this.initMouseSwipe( portfolio );
		this.initTouch( portfolio );
		this.initKeyboad( portfolio );

	}

	init( portfolio ) {

		window.addEventListener( 'hashchange', () => portfolio.load() );

	}

	initButtons( portfolio ) {

		const { nav } = portfolio;
		nav.back.addEventListener( 'click', () => portfolio.back() );
		nav.forward.addEventListener( 'click', () => portfolio.forward() );
		nav.dropdownButton.addEventListener( 'click', () => nav.toggle() );
		nav.dropdown.addEventListener( 'click', ( event ) => {

			const text = event.target.innerText.toLowerCase();
			const hash = nav.exceptions[ text ] || text.replaceAll( ' ', '-' );
			portfolio.goto( hash );
			nav.tweenOut();

		} );

		portfolio.invitation.addEventListener( 'click', ()=> portfolio.goto( 1 ) );
		portfolio.menu.items.forEach( item => item.addEventListener(
			'click', ( event ) => {

				portfolio.goto(
					event.currentTarget
						.querySelector( 'h4' )
						.innerText
						.toLowerCase()
				);

			} )
		);

	}

	initMouseSwipe( portfolio ) {

		this.onMouseDown = function ( event ) {

			if ( event.button > 0 ) return;
			portfolio.nav.tweenOut();
			this.swiping = true;
			this.start = event.clientX;

		}.bind( this );

		this.onMouseUp = function ( event ) {

			//if ( ! this.swiping || portfolio.nav.isOpen ) return;
			if ( ! this.swiping ) return;
			this.swiping = false;

			const distance = this.start - event.clientX;
			if ( Math.abs( distance ) < 10 ) return;

			if ( distance < 0 ) portfolio.back();
			else portfolio.forward();

		}.bind( this );

		//window.addEventListener( 'mousedown', event => console.log( event.target ) );
		//window.addEventListener( 'wheel', event => console.log( event.target ) );

		portfolio.canvas.addEventListener( 'mousedown', this.onMouseDown );
		window.addEventListener( 'mouseup', this.onMouseUp );

	}

	initTouch( portfolio ) {

		this.cancelSwipe = function () {

			this.swiping = false;

		}.bind( this );

		this.onTouchStart = function ( event ) {

			this.cancelSwipeTimer = setTimeout( this.cancelSwipe, 1000 );
			this.onMouseDown( event.targetTouches[ 0 ] );

		}.bind( this );

		this.onTouchEnd = function ( event ) {

			clearTimeout( this.cancelSwipeTimer );
			this.onMouseUp( event.changedTouches[ 0 ] );

		}.bind( this );

		portfolio.canvas.addEventListener( 'touchstart', this.onTouchStart );
		portfolio.canvas.addEventListener( 'touchend', this.onTouchEnd );

	}

	initKeyboad( portfolio ) {

		const keysBack = [
			33, 'PageUp',
			37, 'ArrowLeft'
		];

		const keysForward = [
			34, 'PageDown',
			39, 'ArrowRight'
		];

		const keys = [ ...keysBack, ...keysForward ];

		function onKeyDown( event ) {

			if (
				keys.includes( event.keyCode ) ||
				keys.includes( event.key )
			) event.preventDefault();

		}

		function onKeyUp( event ) {

			if (
				keysBack.includes( event.keyCode ) ||
				keysBack.includes( event.keyCode )
			) {

				event.preventDefault();
				return portfolio.back();

			}

			if (
				keysForward.includes( event.keyCode ) ||
				keysForward.includes( event.key )
			) {

				event.preventDefault();
				return portfolio.forward();

			}

		}

		window.addEventListener( 'keydown', onKeyDown );
		window.addEventListener( 'keyup', onKeyUp );

	}

}

export { Controls };
