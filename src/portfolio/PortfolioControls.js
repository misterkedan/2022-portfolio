class PortfolioControls {

	constructor( portfolio ) {

		this.init( portfolio );
		this.initButtons( portfolio );
		this.initKeyboad( portfolio );

	}

	init( portfolio ) {

		window.addEventListener( 'hashchange', () => portfolio.load() );

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
