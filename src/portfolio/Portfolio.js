import anime from 'animejs';

import { Background } from './Background';
import { Controls } from './Controls';
import { Screen } from './Screen';
import { UI } from './UI';

class Portfolio {

	constructor() {

		this.background = new Background();
		this.canvas = this.background.sketchpad.canvas;

		const { grid, navscan, rain, blockflow, ablaze } = this.background;
		const { HOME, INTRO, WORKS, INFO } = Screen.types;

		this.screens = [

			new Screen( { type: HOME,  sketch: grid, 	id: 'home' } ),

			new Screen( { type: INTRO, sketch: navscan, id: 'navscan' } ),
			new Screen( { type: INTRO, sketch: rain, 	id: 'rain' } ),
			new Screen( { type: INTRO, sketch: blockflow, id: 'blockflow' } ),
			new Screen( { type: INTRO, sketch: ablaze, 	id: 'ablaze' } ),

			new Screen( { type: WORKS, sketch: grid, id: 'orion' } ),
			new Screen( { type: WORKS, sketch: grid, id: 'disintegrator' } ),
			new Screen( { type: WORKS, sketch: grid, id: 'textformer' } ),
			new Screen( { type: WORKS, sketch: grid, id: 'vesuna' } ),

			new Screen( { type: INFO,  sketch: grid, id: 'about' } ),
			new Screen( { type: INFO,  sketch: grid, id: 'links' }  )

		];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.ui = new UI( this );
		this.controls = new Controls( this );

		this.refresh();

	}

	load() {

		const hash = window.location.hash.replace( '#', '' );

		this.to( hash );

	}

	back() {

		if ( this.atStart ) return;

		this.transitionTo( this.index - 1 );

	}

	forward() {

		if ( this.atEnd ) return;

		this.transitionTo( this.index + 1 );

	}

	to( index ) {

		if ( typeof index !== 'number' ) index = this.indexOf( index );

		if ( index === this.index ) return;

		this.transitionTo( index );

	}

	transitionTo( index ) {

		const { background, screens, currentScreen } = this;

		const targetScreen = screens[ index ];
		const backwards = ( index < this.index );

		this.set( index );

		const currentSketch = currentScreen.sketch;
		const targetSketch = targetScreen.sketch;
		const duration = 1000;
		const easing = 'easeOutCirc';

		if ( currentSketch !== targetScreen.sketch ) {

			let sketchA = currentSketch;
			let sketchB = targetSketch;
			let mix = [ 0, 1 ];

			if ( backwards ) {

				sketchA = targetSketch;
				sketchB = currentSketch;
				mix = [ 1, 0 ];

			}

			background.mixer.set( sketchA, sketchB );

			anime( {
				duration,
				easing,
				targets: this.background.mixer,
				mix,
			} );

		}

		if (
			currentSketch === background.grid ||
			targetSketch === background.grid
		) {

			const gridOffset = this.background.grid.tileSize * 21;

			const offset = ( backwards )
				? [ 0, gridOffset ]
				: [ 0, - gridOffset ];

			anime( {
				duration: duration * 1.5,
				easing,
				targets: this.background.grid,
				offset,
			} );

		}

	}

	set( index ) {

		this.index = index;
		this.currentScreen = this.screens[ index ];
		this.refresh();
		window.location.hash = this.currentScreen.id;

	}

	refresh() {

		this.screens.forEach( screen => screen.hide() );
		this.currentScreen.show();

		this.atStart = ( this.index === 0 );
		this.atEnd = ( this.index === this.length - 1 );
		this.ui.setArrows( this.atStart, this.atEnd );

	}

	indexOf( hash ) {

		for ( let index = 0; index < this.length; index ++ ) {

			if ( this.screens[ index ].id === hash ) return index;

		}

		return 0;

	}

}

export { Portfolio };
