import { Vector2 } from 'three';

class PortfolioControls {

	constructor( portfolio ) {

		this.init( portfolio );
		this.initMouse( portfolio );
		this.initTouch( portfolio );
		this.initButtons( portfolio );
		this.initKeyboad( portfolio );

	}

	init( portfolio ) {

		window.addEventListener( 'hashchange', () => portfolio.load() );

	}

	initMouse( portfolio ) {

		this.onMouseDown = function ( event ) {

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

		portfolio.canvas.addEventListener( 'mousedown', this.onMouseDown );
		portfolio.canvas.addEventListener( 'mouseup', this.onMouseUp );

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

	initButtons( portfolio ) {

		const { back, forward, nav } = portfolio.view;

		back.addEventListener( 'click', () => portfolio.back() );
		forward.addEventListener( 'click', () => portfolio.forward() );

		nav.showcase.addEventListener( 'click', () => portfolio.jumpTo( 'navscan' ) );
		nav.works.addEventListener( 'click', () => portfolio.jumpTo( 'orion' ) );
		nav.about.addEventListener( 'click', () => portfolio.jumpTo( 'about' ) );

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

export { PortfolioControls };
