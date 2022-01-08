class PortfolioView {

	constructor() {

		const ids = [
			'background',
			'intro', 'demo', 'showcase', 'about',
			'nav', 'title', 'footer',
			'job', 'fader',
		];

		ids.forEach(
			id => this[ id ] = document.getElementById( id )
		);

		this.firstName = document.getElementById( 'name-first' );
		this.alias = document.getElementById( 'name-alias' );
		this.back = document.getElementById( 'arrow-back' );
		this.forward = document.getElementById( 'arrow-forward' );

	}

	setArrows( hideBack, hideForward ) {

		const HIDDEN = 'hidden';
		const VISIBLE = 'visible';
		this.back.style.visibility = ( hideBack ) ? HIDDEN : VISIBLE;
		this.forward.style.visibility  = ( hideForward ) ? HIDDEN : VISIBLE;

	}

}

export { PortfolioView };


