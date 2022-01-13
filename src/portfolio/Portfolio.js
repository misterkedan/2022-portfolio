import { UI } from './misc/UI';
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

		const { grid } = this.background;
		const home = new HomeScreen( grid, this );
		const demos = [
			'navscan',
			'rain',
			'blockflow',
			'ablaze'
		].map( id => new DemoScreen( id, this.background[ id ] ) );
		const works = [
			'orion',
			'vesuna',
			'disintegrator',
			'textformer'
		].map( id => new WorksScreen( id, grid ) );
		const about = [
			new AboutScreen( grid ),
			new LinksScreen( grid, this.ui )
		];
		this.screens = [ home, ...demos, ...works, ...about ];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.invitation = home.invitation;
		this.animations = new Animations( this );
		this.controls = new Controls( this );

	}

	load() {

		const hash = window.location.hash.replace( '#', '' );

		this.goto( hash );

	}

	back() {

		if ( this.isStarting ) return;

		this.goto( this.index - 1 );

	}

	forward() {

		if ( this.isEnding ) return;

		this.goto( this.index + 1 );

	}

	goto( index ) {

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
		window.location.hash = this.currentScreen.id;

	}

	indexOf( hash ) {

		for ( let index = 0; index < this.length; index ++ ) {

			if ( this.screens[ index ].id === hash ) return index;

		}

		return 0;

	}

	get isStarting() {

		return ( this.index === 0 );

	}

	get isEnding() {

		return ( this.index === this.screens.lastIndex );

	}

}

export { Portfolio };
