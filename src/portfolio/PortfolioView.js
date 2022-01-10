class PortfolioView {

	constructor() {

		const ids = [
			'background', 'title', 'fader',
			// Sections
			'intro', 'showcase', 'works', 'about', 'links',
			// Showcase
			'navscan', 'rain', 'blockflow', 'ablaze',
			// Works
			'orion', 'disintegrator', 'textformer', 'vesuna',
		];

		ids.forEach(
			id => this[ id ] = document.getElementById( id )
		);

		this.firstName = document.getElementById( 'name-first' );
		this.alias = document.getElementById( 'name-alias' );
		this.back = document.getElementById( 'arrow-back' );
		this.forward = document.getElementById( 'arrow-forward' );

		this.nav = [ 'showcase', 'works', 'about' ].reduce( ( result, value ) => {

			const link = document.getElementById( `nav-${value}` );
			link.setAttribute( 'href', 'javascript:void(0)' );
			result[ value ] = link;
			return result;

		}, {} );

		//console.log( this );

	}

	setArrows( hideBack, hideForward ) {

		const HIDDEN = 'hidden';
		const VISIBLE = 'visible';
		this.back.style.visibility = ( hideBack ) ? HIDDEN : VISIBLE;
		this.forward.style.visibility  = ( hideForward ) ? HIDDEN : VISIBLE;

	}

}

export { PortfolioView };


