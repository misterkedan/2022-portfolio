import { Controls } from 'keda/three/Controls';

class CyberControls extends Controls {

	constructor( sketch ) {

		super( sketch );

	}

	initGUI() {

		super.initGUI();

		const { VALUE } = Controls;
		const { gui, sketch } = this;

		const colors = gui.addFolder( 'Colors' );
		colors.addColor( sketch.background, 'color1' );
		colors.addColor( sketch.background, 'color2' );
		colors.addColor( sketch.floor.colorFar, VALUE ).name( 'floor1' );
		colors.addColor( sketch.floor.colorNear, VALUE ).name( 'floor2' );
		colors.add( sketch.floor.opacity, VALUE, 0, 1 ).name( 'f-opacity' );
		colors.addColor( sketch.particles.color, VALUE ).name( 'particle' );
		colors.add( sketch.particles.opacity, VALUE, 0, 1 ).name( 'p-opacity' );

		const blur = gui.addFolder( 'Blur' );
		blur.add( this.sketch.radialBlur, 'strength', 0, 0.3 );

		const bloom = gui.addFolder( 'Bloom' );
		bloom.add( sketch.effects.passes.bloom, 'strength', 0, 1 );
		bloom.add( sketch.effects.passes.bloom, 'radius', 0, 1 );
		bloom.add( sketch.effects.passes.bloom, 'threshold', 0, 1 );

	}

}

export { CyberControls };
