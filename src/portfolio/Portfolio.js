import { UI } from './misc/UI';
import { Animations } from './Animations';
import { Background } from './Background';
import { Controls } from './Controls';
import { AboutScreen } from './screens/AboutScreen';
import { DemoScreen } from './screens/DemoScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LinksScreen } from './screens/LinksScreen';
import { ShowcaseScreen } from './screens/ShowcaseScreen';
import { WorksScreen } from './screens/WorksScreen';

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
		const showcase = new ShowcaseScreen( grid );
		const works = [
			'orion',
			'vesuna',
			'disintegrator',
			'textformer'
		].map( id => new WorksScreen( id, grid ) );
		const about = new AboutScreen( grid );
		const links = new LinksScreen( grid, this.ui );

		this.screens = [
			home, ...demos,
			showcase, ...works,
			about, links
		];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.ui.paginationMax = this.length;

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

		if ( typeof index === 'string' ) index = this.indexOf( index );

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

		this.ui.setNav( this.currentSection );
		this.ui.setPagination( index + 1 );

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

	get currentSection() {

		if (
			this.currentScreen instanceof HomeScreen ||
			this.currentScreen instanceof DemoScreen
		) return 'intro';

		if (
			this.currentScreen instanceof AboutScreen ||
			this.currentScreen instanceof LinksScreen
		) return 'about';

		return 'works';

	}

}

export { Portfolio };
