import { PortfolioControls } from './PortfolioControls';
import { PortfolioView } from './PortfolioView';
import { SlidesManager } from './SlidesManager';

class Portfolio extends SlidesManager {

	constructor() {

		super( [ 'intro', 'demo', 'showcase', 'about' ] );

		this.view = new PortfolioView();
		this.view.title.style.display = 'none';

		this.update();

		this.controls = new PortfolioControls( this );

	}

	update() {



		window.location.hash = this.currentSlide;

		this.updateArrows();

		//console.log( this );

	}

	load() {

		const hash = window.location.hash.replace( '#', '' );

		const index = this.slides.indexOf( hash );
		if ( index >= 0 ) {

			this.set( index );

		}

	}

	updateArrows() {

		const { view, nav } = this;

		view.back.style.visibility = ( nav.index === nav.start )
			? 'hidden' : 'visible';
		view.forward.style.visibility  = ( nav.index === nav.end )
			? 'hidden' : 'visible';

	}

}

export { Portfolio };
