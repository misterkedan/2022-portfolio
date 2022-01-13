import { Title } from './misc/Title';
import { UI } from './misc/UI';
import { Screen } from './screens/Screen';
import { AboutScreen } from './screens/AboutScreen';
import { WorksScreen } from './screens/WorksScreen';
import { Animations } from './Animations';
import { Background } from './Background';
import { Controls } from './Controls';
import { LinksScreen } from './screens/LinksScreen';
import { DemoScreen } from './screens/DemoScreen';
import { HomeScreen } from './screens/HomeScreen';

class Portfolio {

	constructor() {

		this.background = new Background();
		this.canvas = this.background.sketchpad.canvas;

		this.ui = new UI( this );

		const { grid, navscan, rain, blockflow, ablaze } = this.background;

		this.home = new HomeScreen( grid, this.ui );

		this.screens = [
			this.home,

			new DemoScreen( { sketch: navscan, 		id: 'navscan' } ),
			new DemoScreen( { sketch: rain, 		id: 'rain' } ),
			new DemoScreen( { sketch: blockflow, 	id: 'blockflow' } ),
			new DemoScreen( { sketch: ablaze, 		id: 'ablaze' } ),

			new WorksScreen( { sketch: grid, id: 'orion' } ),
			new WorksScreen( { sketch: grid, id: 'vesuna' } ),
			new WorksScreen( { sketch: grid, id: 'disintegrator' } ),
			new WorksScreen( { sketch: grid, id: 'textformer' } ),

			new AboutScreen( grid ),
			new LinksScreen( grid ),
		];
		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.title = new Title();
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

		this.ui.setNav( this.currentScreen.type );

		if ( this.currentScreen.type === Screen.types.WORKS )
			this.currentScreen.show();

		this.atStart = ( this.index === 0 );
		this.atEnd = ( this.index === this.length - 1 );
		this.ui.setArrows( false, this.atEnd );

	}

	indexOf( hash ) {

		for ( let index = 0; index < this.length; index ++ ) {

			if ( this.screens[ index ].id === hash ) return index;

		}

		return 0;

	}

}

export { Portfolio };
