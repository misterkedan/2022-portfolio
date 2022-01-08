import { PortfolioControls } from './PortfolioControls';
import { PortfolioView } from './PortfolioView';
import { SlidesManager } from './SlidesManager';

class Portfolio extends SlidesManager {

	constructor() {

		super( [
			'intro',

			'navscan',
			'rain',
			'blockflow',
			'ablaze',

			'orion',
			'disintegrator',
			'textformer',
			'vesuna',

			'about',
			'links'
		] );

		this.view = new PortfolioView();

		this.view.title.style.display = 'none';

		this.load();
		this.update();

		this.controls = new PortfolioControls( this );

	}

	update() {

		window.location.hash = this.currentSlide;

		this.view.setArrows( this.isAtStart, this.isAtEnd );

	}

	load() {

		const hash = window.location.hash.replace( '#', '' );

		const index = this.slides.indexOf( hash );
		if ( index >= 0 ) {

			this.set( index );

		}

	}

}

export { Portfolio };
