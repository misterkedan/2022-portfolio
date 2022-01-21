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

		this.grid = new Backgrid( options );
		this.navscan = new Navscan( options );
		this.rain = new Rain( options );
		this.blockflow = new Blockflow( options );
		this.ablaze = new Ablaze( options );
		this.cyber = new Cyberdark( options );

		this.mixer = new SketchMixer( this.sketchpad.renderer, [
			this.grid,
			this.navscan,
			this.rain,
			this.blockflow,
			this.ablaze,
			this.cyber,
		] );

		this.sketchpad.init( this.mixer );

	}

}

export { Background };
