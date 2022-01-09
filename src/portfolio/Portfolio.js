import { Navigation } from './Navigation';
import { PortfolioControls } from './PortfolioControls';
import { PortfolioView } from './PortfolioView';

class Portfolio {

	constructor() {

		const view = new PortfolioView();
		view.title.style.display = 'none';

		this.slides = [
			view.intro,

			view.navscan,
			view.rain,
			view.blockflow,
			view.ablaze,

			view.orion,
			view.disintegrator,
			view.textformer,
			view.vesuna,

			view.about,
			view.links
		];

		this.view = view;
		this.navigation = new Navigation( this.slides );

		this.load();

		this.controls = new PortfolioControls( this );


	}

	load() {

		if ( this.cancelLoad ) return;

		const hash = window.location.hash.replace( '#', '' );
		this.jumpTo( hash );

	}

	forward() {

		this.navigation.forward();
		this.refresh();

	}

	back() {

		this.navigation.back();
		this.refresh();

	}

	jumpTo( index ) {

		if ( typeof index !== 'number' ) index = this.indexOf( index );
		this.navigation.set( index );
		this.refresh();

	}

	refresh() {

		this.slides.forEach( slide => slide.style.display = 'none' );
		this.navigation.item.style.display = 'flex';

		this.view.setArrows( this.navigation.atStart, this.navigation.atEnd );

		window.location.hash = this.navigation.item.id;

	}

	indexOf( hash ) {

		let index = 0;

		for ( index = this.slides.length - 1; index >= 0; index -- ) {

			if ( this.slides[ index ].id === hash ) break;

		}

		if ( index < 0 ) index = 0;

		return index;

	}

}

export { Portfolio };
