import anime from 'animejs';
import { Textformer } from 'textformer';

const TOOLS = 'tools';
const AFFINITIES = 'affinities';

class AboutShuffler {

	constructor() {

		this.outputs = {
			tools: document.getElementById( TOOLS ),
			affinities: document.getElementById( AFFINITIES ),
		};

		this.pools = {};

		this.reset( TOOLS );
		this.reset( AFFINITIES );

		const removeInitialWord = ( key ) => this.pools[ key ].filter(
			word => word !== this.outputs[ key ].innerText
		);
		this.pools[ TOOLS ] = removeInitialWord( TOOLS );
		this.pools[ AFFINITIES ] = removeInitialWord( AFFINITIES );

		this.animations = {};

		this.trigger = this.trigger.bind( this );

	}

	enable() {

		this.timeout = setTimeout( this.trigger, 3000 );

	}

	disable() {

		clearTimeout( this.timeout );

	}

	trigger() {

		this.toggled = ! this.toggled;

		if ( this.toggled ) this.animate( TOOLS );
		else this.animate( AFFINITIES );

		this.enable();

	}

	animate( key ) {

		if ( this.animations[ key ] ) this.animations[ key ].pause();

		if ( ! this.pools[ key ].length ) this.reset( key );

		const textform = Textformer.build( {
			steps: 12,
			noise: 12,
			mode: Textformer.modes.EXPAND,
			output: this.outputs[ key ],
			to: this.pools[ key ].pop(),
		} );

		this.animations[ key ] = anime( {
			duration: 2000,
			easing: 'easeOutSine',
			targets: textform,
			progress: 1,
		} );

	}

	reset( key ) {

		this.pools[ key ] = AboutShuffler.shuffle( [ ...AboutShuffler[ key ] ] );

	}

}

AboutShuffler.tools = [
	'after effects',
	'ambient occlusion',
	'anime.js',
	'babel',
	'bayer matrix dithering',
	'bloom',
	'buffer attributes',
	'colorful visuals',
	'curl noise',
	'dat.gui (RIP)',
	'depth of field blur',
	'directional blur',
	'geometric shapes',
	'glitch effects',
	'global illumination',
	'GLSL',
	'GPGPU',
	'gradients',
	'lil-gui',
	'monospace fonts',
	'motion blur',
	'OOP',
	'particles',
	'penner\'s easings',
	'perlin noise',
	'photoshop',
	'radial blur',
	'shaping functions',
	'simplex noise',
	'vs code',
	'webpack',
];

AboutShuffler.affinities = [
	'abstract art',
	'aligning things',
	'awwwards',
	'baseball caps',
	'coffee',
	'complexity',
	'concept art',
	'data visualization',
	'dribbble',
	'electronic music',
	'fantasy UIs',
	'generative art',
	'generative design',
	'glossy textures',
	'glowy things',
	'holograms',
	'kimchi',
	'lasers',
	'machine learning',
	'minimalism',
	'pinterest',
	'photography',
	'random word combinations',
	'realistic renders',
	'robots',
	'sci-fi aesthetics',
	'skeuomorphism',
	'soft shadows',
	'spaceships',
	'spaghetti',
	'synthwave',
	'typographic experiments',
	'UI design',
];

AboutShuffler.shuffle = ( array ) => {

	// Durstenfeld shuffle

	for ( let i = array.length - 1; i > 0; i -- ) {

		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];

	}

	return array;

};

export { AboutShuffler };
