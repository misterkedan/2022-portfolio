class PortfolioControls {

	constructor( portfolio ) {

		this.portfolio = portfolio;

		this.initArrows();
		this.initHash();
		this.initKeyboad();

	}

	/*-------------------------------------------------------------------------/

		Buttons

	/-------------------------------------------------------------------------*/

	initArrows() {

		const { portfolio } = this;
		const { view } = portfolio;
		view.forward.addEventListener( 'click', portfolio.forward.bind( portfolio ) );
		view.back.addEventListener( 'click', portfolio.back.bind( portfolio ) );

	}

	/*-------------------------------------------------------------------------/

		Hash

	/-------------------------------------------------------------------------*/

	initHash() {

		this.onHashChange = this.onHashChange.bind( this );
		window.addEventListener( 'hashchange', this.onHashChange );

	}

	onHashChange( event ) {

		this.portfolio.load( event.hash );

	}

	/*-------------------------------------------------------------------------/

		Keyboard

	/-------------------------------------------------------------------------*/

	initKeyboad() {

		const PAGE_UP_CODE = 33;
		const PAGE_UP_KEY = 'PageUp';

		const PAGE_DOWN_CODE = 34;
		const PAGE_DOWN_KEY = 'PageDown';

		const ARROW_LEFT_CODE = 37;
		const ARROW_LEFT_KEY = 'ArrowLeft';

		const ARROW_RIGHT_CODE = 39;
		const ARROW_RIGHT_KEY = 'ArrowRight';

		this.backCodes = [ PAGE_UP_CODE, ARROW_LEFT_CODE ];
		this.backKeys = [ PAGE_UP_KEY, ARROW_LEFT_KEY ];
		this.forwardCodes = [ PAGE_DOWN_CODE, ARROW_RIGHT_CODE ];
		this.forwardKeys = [ PAGE_DOWN_KEY, ARROW_RIGHT_KEY ];

		this.onKeyUp = this.onKeyUp.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );

		window.addEventListener( 'keydown', this.onKeyDown );
		window.addEventListener( 'keyup', this.onKeyUp );

	}

	onKeyDown( event ) {

		if (
			this.backCodes.includes( event.keyCode ) ||
			this.forwardCodes.includes( event.keyCode ) ||
			this.backKeys.includes( event.key ) ||
			this.forwardKeys.includes( event.key )
		) event.preventDefault();

	}

	onKeyUp( event ) {

		if (
			this.backCodes.includes( event.keyCode ) ||
			this.backKeys.includes( event.keyCode )
		) {

			event.preventDefault();
			return this.portfolio.back();

		}

		if (
			this.forwardCodes.includes( event.keyCode ) ||
			this.forwardKeys.includes( event.key )
		) {

			event.preventDefault();
			return this.portfolio.forward();

		}

		//console.log( event );

	}

}

export { PortfolioControls };
