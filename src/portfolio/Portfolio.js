import { Screen } from './elements/Screen';
import { Title } from './elements/Title';
import { UI } from './elements/UI';
import { WorksScreen } from './elements/WorksScreen';
import { Animations } from './Animations';
import { Background } from './Background';
import { Controls } from './Controls';
import { AboutScreen } from './elements/AboutScreen';

class Portfolio {

	constructor() {

		this.background = new Background();
		this.canvas = this.background.sketchpad.canvas;

		const { grid, navscan, rain, blockflow, ablaze } = this.background;
		const { HOME, INTRO, INFO } = Screen.types;

		this.screens = [

			new Screen( { type: HOME,  sketch: grid, 	id: 'home' } ),

			new Screen( { type: INTRO, sketch: navscan, 	id: 'navscan' } ),
			new Screen( { type: INTRO, sketch: rain, 		id: 'rain' } ),
			new Screen( { type: INTRO, sketch: blockflow, 	id: 'blockflow' } ),
			new Screen( { type: INTRO, sketch: ablaze, 		id: 'ablaze' } ),

			new WorksScreen( { sketch: grid, id: 'orion' } ),
			new WorksScreen( { sketch: grid, id: 'vesuna' } ),
			new WorksScreen( { sketch: grid, id: 'disintegrator' } ),
			new WorksScreen( { sketch: grid, id: 'textformer' } ),

			//new Screen( { type: INFO,  sketch: grid, id: 'about' } ),
			new AboutScreen( grid ),
			new Screen( { type: INFO,  sketch: grid, id: 'links' }  )

		];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.title = new Title();
		this.ui = new UI( this );
		this.animations = new Animations( this );
		this.controls = new Controls( this );

		this.refresh();

	}

	load() {

		const hash = window.location.hash.replace( '#', '' );

		this.goto( hash );

	}

	back() {

		if ( this.atStart ) return;

		this.goto( this.index - 1 );

	}

	forward() {

		if ( this.atEnd ) return;

		this.goto( this.index + 1 );

	}

	goto( index ) {

		//if ( this.debounce ) return;
		//this.debounce = setTimeout( () => this.debounce = false, 125 );

		if ( typeof index !== 'number' ) index = this.indexOf( index );

		if ( index === this.index ) return;

		const from = this.currentScreen;
		const to = this.screens[ index ];
		const backwards = ( index < this.index );

		this.set( index );

		this.animations.tween( from, to, backwards );

	}

	set( index ) {

		this.index = index;
		this.currentScreen = this.screens[ index ];
		this.refresh();
		window.location.hash = this.currentScreen.id;

	}

	refresh() {

		this.screens.forEach( screen => {

			if ( screen.type === Screen.types.INFO ) screen.hide();

		} );
		this.screens[ 0 ].show();
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
