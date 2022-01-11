class UI {

	constructor() {

		this.back = document.getElementById( 'arrow-back' );
		this.forward = document.getElementById( 'arrow-forward' );

		this.nav = [ 'intro', 'works', 'about' ].reduce( ( result, value ) => {

			const link = document.getElementById( `nav-${value}` );
			link.setAttribute( 'href', 'javascript:void(0)' );
			result[ value ] = link;
			return result;

		}, {} );

	}

	setArrows( hideBack, hideForward ) {

		const HIDDEN = 'hidden';
		const VISIBLE = 'visible';
		this.back.style.visibility = ( hideBack ) ? HIDDEN : VISIBLE;
		this.forward.style.visibility  = ( hideForward ) ? HIDDEN : VISIBLE;

	}

}

export { UI };
