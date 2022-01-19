import { Animations } from './Animations';
import { Background } from './Background';
import { Controls } from './Controls';
import { AboutScreen } from './screens/AboutScreen';
import { DemoScreen } from './screens/DemoScreen';
import { CoverScreen } from './screens/CoverScreen';
import { LinksScreen } from './screens/LinksScreen';
import { OtherProjectsScreen } from './screens/OtherProjectsScreen';
import { ProjectScreen } from './screens/ProjectScreen';
import { Nav } from './Nav';
import { Menu } from './misc/Menu';

class Portfolio {

	constructor() {

		this.nav = new Nav();
		this.menu = new Menu();
		this.background = new Background();

		this.canvas = this.background.sketchpad.canvas;
		const { cyber } = this.background;

		const home = new CoverScreen( this.background.grid, this.nav );
		const demos = [
			'navscan',
			'rain',
			'blockflow',
			'ablaze',
		].map( id => new DemoScreen( id, this.background[ id ] ) );

		const otherProjects = new OtherProjectsScreen( cyber );
		const projects = [
			'orion',
			'vesuna',
			'textformer',
			'disintegrator',
			'sketches',
		].map( id => new ProjectScreen( id, cyber ) );

		const about = new AboutScreen( cyber );
		const links = new LinksScreen( cyber );

		this.screens = [
			home, ...demos,
			otherProjects, ...projects,
			about, links
		];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.pagination = document.getElementById( 'pagination' );

		this.animations = new Animations( this );

		this.invitation = home.invitation;
		this.otherProjects = otherProjects;
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

		index = Math.min( Math.max( index, 0 ), this.screens.length - 1 );

		const from = this.currentScreen;
		const to = this.screens[ index ];
		const backwards = ( index < this.index );

		this.set( index );

		this.animations.tween( from, to, backwards );

	}

	set( index ) {

		this.index = index;
		this.currentScreen = this.screens[ index ];

		this.pagination.innerText = `${index}/${this.length - 1}`;

		const hash = this.currentScreen.id;
		this.menu.update( hash );
		this.nav.setForward( this.isEnding );

		window.location.hash = hash;

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
