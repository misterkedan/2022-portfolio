import { GPGPU } from 'keda/three/gpgpu/GPGPU';
import { Sketchpad } from 'keda/three/Sketchpad.js';
import { SketchMixer } from './sketches/SketchMixer';

import { Ablaze } from './sketches/ablaze/Ablaze';
import { Blockflow } from './sketches/blockflow/Blockflow';
import { Backgrid } from './sketches/backgrid/Backgrid';
import { Navscan } from './sketches/navscan/Navscan';
import { Rain } from './sketches/rain/Rain';

class Background {

	constructor() {

		// Sketchpad

		const container = document.getElementById( 'background' );
		this.container = container;

		this.sketchpad = new Sketchpad( { container } );
		GPGPU.init( this.sketchpad.renderer );

		// Sketches

		const options = {
			sketchpad: this.sketchpad,
			renderToScreen: false,
		};

		this.grid = new Backgrid( options );
		this.navscan = new Navscan( options );
		this.rain = new Rain( options );
		this.blockflow = new Blockflow( options );
		this.ablaze = new Ablaze( options );

		const sketches = [
			this.grid,
			this.navscan,
			this.rain,
			this.blockflow,
			this.ablaze,
		];
		this.mixer = new SketchMixer( this.sketchpad.renderer, sketches );

		this.sketchpad.init( this.mixer );

	}

}

export { Background };
