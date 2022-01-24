import { Textformer } from 'textformer';
import { Animations } from './Animations';
import { Background } from './Background';
import { Controls } from './Controls';
import { AboutScreen } from './screens/AboutScreen';
import { DemoScreen } from './screens/DemoScreen';
import { CoverScreen } from './screens/CoverScreen';
import { ContactScreen } from './screens/ContactScreen';
import { OtherProjectsScreen } from './screens/OtherProjectsScreen';
import { ProjectScreen } from './screens/ProjectScreen';
import { DemoOverlay } from './misc/DemoOverlay';
import { DynamicTitle } from './misc/DynamicTitle';
import { Menu } from './misc/Menu';
import { Nav } from './misc/Nav';
import { NavProgress } from './misc/NavProgress';

class Portfolio {

	constructor() {

		Textformer.defaults.autoplay = false;

		this.footer = document.querySelector( 'footer' );
		this.nav = new Nav();
		this.menu = new Menu();

		this.background = new Background();
		this.canvas = this.background.sketchpad.canvas;
		const { cyber } = this.background;

		const home = new CoverScreen( this.background.grid, this.nav, this.footer );
		const demos = [
			'navscan',
			'rain',
			'ablaze',
			'blockflow',
		].map( id => new DemoScreen( id, this.background[ id ] ) );

		const otherProjects = new OtherProjectsScreen( cyber );
		const projects = [
			'vesuna',
			'textformer',
			'orion',
			'disintegrator',
			'sketches',
		].map( id => new ProjectScreen( id, cyber ) );

		const about = new AboutScreen( cyber );
		const links = new ContactScreen( cyber );

		this.screens = [
			home, ...demos,
			otherProjects, ...projects,
			about, links
		];

		this.length = this.screens.length;
		this.index = 0;
		this.currentScreen = this.screens[ this.index ];

		this.demoOverlay = new DemoOverlay();
		this.dynamicTitle = new DynamicTitle();
		this.navProgress = new NavProgress( this.length - 1 );

		this.animations = new Animations( this );

		this.invitation = home.invitation;
		this.otherProjects = otherProjects;
		this.controls = new Controls( this );

		console.log(
			'%c Crafted with love, by Pierre Keda',
			'background: #00aaee; color: #ffffff; padding: 1em;'
		);

		console.log(
			'If you\'re curious about how this portfolio was made,\n'
			+ 'you can check out the full repository at:\n'
			+ 'https://github.com/pierrekeda/2022-portfolio \n\n'
			+ 'Have a nice day!'
		);

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

		if ( this.locked ) return;
		this.locked = setTimeout( function () {

			this.locked = false;

		}.bind( this ), 400 );

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

		const hash = this.currentScreen.id;
		this.menu.update( hash );
		this.nav.setForward( this.isEnding );
		requestAnimationFrame( ()=>this.updateScroll() );

		window.location.hash = hash;

	}

	indexOf( hash ) {

		for ( let index = 0; index < this.length; index ++ ) {

			if ( this.screens[ index ].id === hash ) return index;

		}

		return 0;

	}

	updateScroll() {

		if ( this.canScrollUp ) this.nav.domElement.classList.add( 'hidden' );
		else this.nav.domElement.classList.remove( 'hidden' );

		if ( this.canScrollDown ) this.footer.classList.add( 'hidden' );
		else ( this.footer.classList.remove( 'hidden' ) );

	}

	get isStarting() {

		return ( this.index === 0 );

	}

	get isEnding() {

		return ( this.index === this.screens.lastIndex );

	}

	/*-------------------------------------------------------------------------/

		Scroll utils

	/-------------------------------------------------------------------------*/

	get height() {

		return ( this.currentScreen instanceof DemoScreen )
			? this.demoOverlay.domElement.clientHeight
			: this.currentScreen.domElement.clientHeight;

	}

	get offset() {

		return window.pageYOffset || window.scrollY;

	}

	get canScrollUp() {

		return ( this.offset > 0 );

	}

	get canScrollDown() {

		return ( ( window.innerHeight + this.offset ) < this.height );

	}

}

export { Portfolio };
