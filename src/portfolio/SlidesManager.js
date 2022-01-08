class SlidesManager {

	constructor( slides = [] ) {

		this.slides = slides;

		this.length = slides.length;

		this.nav = {
			start: 0,
			end: this.length - 1,
			index: null,
		};

		this.set( 0, false );

	}

	back() {

		if ( this.nav.index === this.nav.start ) return;
		this.set( this.nav.index - 1 );

	}

	forward() {

		if ( this.nav.index === this.nav.end ) return;
		this.set( this.nav.index + 1 );

	}

	set( index, update = true ) {

		if ( index === this.nav.index ) return;

		this.nav.index = index;
		const newSlide = this.slides[ this.nav.index ];
		this.currentSlide = newSlide;
		if ( update ) this.update();

	}

	update() {

		console.log( { index: this.nav.index, slide: this.currentSlide } );

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get isAtStart() {

		return this.nav.index === this.nav.start;

	}

	get isAtEnd() {

		return this.nav.index === this.nav.end;

	}

}

export { SlidesManager };
