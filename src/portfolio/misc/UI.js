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

		this.pagination = document.getElementById( 'pagination' );

	}

	setPagination( number ) {

		this.pagination.innerText = `${number}/${this.paginationMax}`;

	}

	setNav( selected ) {

		Object.values( this.nav ).forEach(
			element => element.classList.remove( 'selected' )
		);

		this.nav[ selected ]?.classList.add( 'selected' );

	}

}

export { UI };
