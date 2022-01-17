import { GPGPU } from 'keda/three/gpgpu/GPGPU';
import { Sketchpad } from 'keda/three/Sketchpad.js';
import { SketchMixer } from './sketches/SketchMixer';

import { Ablaze } from './sketches/ablaze/Ablaze';
import { Blockflow } from './sketches/blockflow/Blockflow';
import { Backgrid } from './sketches/backgrid/Backgrid';
import { Navscan } from './sketches/navscan/Navscan';
import { Rain } from './sketches/rain/Rain';
import { Cyberdark } from './sketches/cyberdark/Cyberdark';

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

		this.mixer = new SketchMixer( this.sketchpad.renderer );

		this.grid = new Backgrid( options );
		this.navscan = new Navscan( options );
		this.rain = new Rain( options );
		this.blockflow = new Blockflow( options );
		this.ablaze = new Ablaze( options, this.mixer.radialBlur );
		this.cyber = new Cyberdark( options, this.mixer.radialBlur );

		this.grid.blur = 0;
		this.navscan.blur = 0;
		this.rain.blur = 0.01;
		this.blockflow.blur = 0;
		this.ablaze.blur = 0.015;
		this.cyber.blur = 0;

		this.mixer.sketches = [
			this.grid,
			this.navscan,
			this.rain,
			this.blockflow,
			this.ablaze,
			this.cyber,
		];

		//this.mixer = new SketchMixer( this.sketchpad.renderer, sketches );

		this.sketchpad.init( this.mixer );

	}

}

export { Background };
