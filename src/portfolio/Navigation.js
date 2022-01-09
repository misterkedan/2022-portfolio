class Navigation {

	constructor( items ) {

		this.items = items;
		this.length = items.length;

		this.start = 0;
		this.end = this.length - 1;

		this.set( 0 );

	}

	back() {

		if ( this.index === this.start ) return;
		this.set( this.index - 1 );

	}

	forward() {

		if ( this.index === this.end ) return;
		this.set( this.index + 1 );

	}

	set( index ) {

		if ( index === this.index ) return;
		this.index = index;
		this.item = this.items[ this.index ];

	}


	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get atStart() {

		return this.index === this.start;

	}

	get atEnd() {

		return this.index === this.end;

	}

}

export { Navigation };
