class Controls {

	constructor( portfolio ) {

		this.init( portfolio );
		this.initClick( portfolio );
		this.initMouseSwipe( portfolio );
		this.initTouch( portfolio );
		this.initKeyboad( portfolio );
		this.initWheel( portfolio );

	}

	init( portfolio ) {

		window.addEventListener( 'hashchange', () => portfolio.load() );

	}

	initClick( portfolio ) {

		const { nav, menu } = portfolio;
		nav.back.addEventListener( 'click', () => portfolio.back() );
		nav.forward.addEventListener( 'click', () => portfolio.forward() );
		nav.menuButton.addEventListener( 'click', () => menu.tweenIn() );

		menu.list.addEventListener( 'click', ( event ) => {

			menu.tweenOut();
			const target = event.target.getAttribute( 'data-ref' );
			if ( ! target ) return;
			setTimeout( () => portfolio.goto( target ), 200 );

		} );
		menu.domElement.addEventListener( 'click', () => menu.tweenOut() );

		portfolio.invitation.addEventListener( 'click', ()=> portfolio.goto( 1 ) );

		portfolio.otherProjects.items.forEach(
			item => item.addEventListener( 'click', ( event ) => portfolio.goto(
				event.currentTarget.getAttribute( 'data-ref' ) || 0
			) )
		);

		Array.from( document.querySelectorAll( '.menu-return' ) ).forEach(
			element => element.addEventListener(
				'click', () => portfolio.goto( 'other-projects' )
			)
		);

		portfolio.navProgress.domElement.addEventListener( 'click', ( event ) => {

			const target = event.clientX / window.innerWidth;
			const index = Math.round( target * ( portfolio.length - 1 ) );
			portfolio.goto( index );

		} );

	}

	initWheel( portfolio ) {

		window.addEventListener( 'wheel', ( event ) => {

			if ( portfolio.menu.opened ) return;

			if ( event.deltaX ) {

				if ( event.deltaX > 0 ) portfolio.forward();
				else portfolio.back();
				return;

			}

			if ( ! event.deltaY ) return;

			if ( event.deltaY > 0 && ! portfolio.canScrollDown ) {

				portfolio.forward();
				window.scrollTo( window.scrollX, 0 );

			}

			if ( event.deltaY < 0 && ! portfolio.canScrollUp ) {

				portfolio.back();
				window.scrollTo(
					window.scrollX,
					Math.max( 0, portfolio.height - window.innerHeight ),
				);

			}

		} );

	}

	initMouseSwipe( portfolio ) {

		this.onMouseDown = function ( event ) {

			if ( event.button > 0 ) return;
			this.swiping = true;
			this.start = event.clientX;

		}.bind( this );

		this.onMouseUp = function ( event ) {

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
