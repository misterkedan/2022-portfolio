import { Navigation } from './Navigation';
import { PortfolioControls } from './PortfolioControls';
import { PortfolioView } from './PortfolioView';
import { Backgrid } from './sketches/backgrid/Backgrid';
import { Sketchpad } from 'keda/three/Sketchpad.js';
import anime from 'animejs';

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

		this.initSketchpad();
		this.initAnime();

		this.load();

		this.controls = new PortfolioControls( this );

	}

	initSketchpad() {

		this.sketchpad = new Sketchpad( { container: this.view.background } );

		this.grid = new Backgrid( {
			sketchpad: this.sketchpad,
			//gui: true,
		} );

		this.sketchpad.init( this.grid );

		this.canvas = this.sketchpad.canvas;

	}

	initAnime() {

		this.animeGridOffset = this.grid.tileSize * 21;
		this.animeSettings = {
			targets: this.grid,
			duration: 550,
			easing: 'easeOutCirc',
		};

		this.clearForwarding = function () {

			this.forwarding = null;

		}.bind( this );

		this.clearBacking = function () {

			this.backing = null;

		}.bind( this );

	}

	load() {

		if ( this.cancelLoad ) return;

		const hash = window.location.hash.replace( '#', '' );
		this.jumpTo( hash );

	}

	back() {

		if ( this.navigation.atStart ) return;

		if ( this.backing ) return;

		if ( this.forwarding ) return this.forwarding.reverse();

		this.backing = anime( {
			...this.animeSettings,
			offset: [ 0, this.animeGridOffset ],
			complete: this.clearBacking,
		} );

		this.navigation.back();
		this.refresh();

	}

	forward() {

		if ( this.navigation.atEnd ) return;

		if ( this.forwarding ) return;

		if ( this.backing ) return this.backing.reverse();

		this.forwarding = anime( {
			...this.animeSettings,
			offset: [ 0, - this.animeGridOffset ],
			complete: this.clearForwarding,
		} );

		this.navigation.forward();
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
