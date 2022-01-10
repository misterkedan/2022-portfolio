import anime from 'animejs';
import { Navigation } from './Navigation';
import { PortfolioControls } from './PortfolioControls';
import { PortfolioView } from './PortfolioView';
import { Sketchpad } from 'keda/three/Sketchpad.js';
import { SketchMixer } from './sketches/SketchMixer';

import { Ablaze } from './sketches/ablaze/Ablaze';
import { Blockflow } from './sketches/blockflow/Blockflow';
import { Backgrid } from './sketches/backgrid/Backgrid';
import { Navscan } from './sketches/navscan/Navscan';
import { Rain } from './sketches/rain/Rain';

import { GPGPU } from 'keda/three/gpgpu/GPGPU';

class Portfolio {

	constructor() {

		this.view = new PortfolioView();
		this.screens = this.view.screens;
		this.navigation = new Navigation( this.screens );

		this.initSketchpad();

		this.intros = 5;
		this.works = 4;
		this.infos = 2;

	}

	initSketchpad() {

		this.sketchpad = new Sketchpad( { container: this.view.background } );

		GPGPU.init( this.sketchpad.renderer );

		const options = {
			sketchpad: this.sketchpad,
			renderToScreen: false,
		};

		this.grid = new Backgrid( { ...options } );
		this.navscan = new Navscan( { ...options } );
		this.rain = new Rain( { ...options } );
		this.blockflow = new Blockflow( { ...options } );
		this.ablaze = new Ablaze( { ...options } );

		const sketches = [
			this.grid,
			this.navscan,
			this.rain,
			this.blockflow,
			this.ablaze,
		];

		this.mixer = new SketchMixer( this.sketchpad.renderer, sketches );

		this.sketchpad.init( this.mixer );


		this.canvas = this.sketchpad.canvas;

		this.initAnime();

		this.load();
		this.refresh();
		this.controls = new PortfolioControls( this );


	}

	initAnime() {

		this.animeGridOffset = this.grid.tileSize * 21;
		this.animeSettings = {
			targets: this.grid,
			duration: 700,
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

		this.transitionTo( this.index - 1 );

	}

	forward() {

		if ( this.navigation.atEnd ) return;

		this.transitionTo( this.index + 1 );

	}

	jumpTo( index ) {

		if ( typeof index !== 'number' ) index = this.indexOf( index );

		this.transitionTo( index );

	}

	refresh() {

		this.screens.forEach( slide => slide.style.display = 'none' );
		this.navigation.item.style.display = 'flex';

		this.view.setArrows( this.navigation.atStart, this.navigation.atEnd );

		window.location.hash = this.navigation.item.id;

	}

	indexOf( hash ) {

		let index = 0;

		for ( index = this.screens.length - 1; index >= 0; index -- ) {

			if ( this.screens[ index ].id === hash ) break;

		}

		if ( index < 0 ) index = 0;

		return index;

	}

	transitionTo( newIndex ) {

		const currentIndex = this.index;

		if ( newIndex === currentIndex ) return;

		const backwards = ( newIndex < currentIndex );

		//console.log( { currentIndex, newIndex } );
		//this.intros = 5;
		//this.works = 4;
		//this.infos = 2;

		if ( backwards ) {

			if ( this.backing ) return;
			if ( this.forwarding ) return this.forwarding.reverse();

			this.navigation.set( newIndex );
			this.refresh();

			this.backTo( newIndex );

		} else {

			if ( this.forwarding ) return;
			if ( this.backing ) return this.backing.reverse();

			this.navigation.set( newIndex );
			this.refresh();

			this.forwardTo( newIndex );

		}

	}

	set( index ) {

		this.navigation.set( index );
		this.refresh();

	}

	backTo( index ) {

		if ( index < this.intros ) {

			this.mixer.set( index % this.intros, this.index % this.intros );

			this.backing = anime( {
				...this.animeSettings,
				targets: this.mixer,
				mix: [ 1, 0 ],
				complete: this.clearBacking,
			} );

		} else {

			this.backing = anime( {
				...this.animeSettings,
				targets: this.grid,
				offset: [ 0, this.animeGridOffset ],
				complete: this.clearBacking,
			} );

		}

	}

	forwardTo( index ) {

		if ( index <= this.intros ) {

			this.mixer.set( this.index % this.intros, index % this.intros );

			this.forwarding = anime( {
				...this.animeSettings,
				targets: this.mixer,
				mix: [ 0, 1 ],
				complete: this.clearForwarding,
			} );

		} else {

			this.forwarding = anime( {
				...this.animeSettings,
				targets: this.grid,
				offset: [ 0, - this.animeGridOffset ],
				complete: this.clearForwarding,
			} );

		}

	}

	set index( index ) {

		this.navigation.set( index );

	}

	get index() {

		return this.navigation.index;

	}

}

export { Portfolio };
