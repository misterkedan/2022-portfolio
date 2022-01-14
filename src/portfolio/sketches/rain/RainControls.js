import { Controls } from 'keda/three/Controls';

class RainControls extends Controls {

	constructor( sketch ) {

		super( sketch );

		this.intensity = 0.5;

	}

	tick( delta ) {

		const { clamp, lerp } = Controls;
		const { sketch, tracker } = this;
		const { settings } = sketch;

		const lerpSpeed = clamp( settings.lerpSpeed * delta, 0, 1 );

		this.cameraRig
			.update( tracker.reversePolarizeX, tracker.y )
			.tick( delta );

		// X

		const targetIntensity = tracker.centerX;
		this.intensity = lerp(
			this.intensity,
			targetIntensity,
			lerpSpeed
		);

		sketch.mesh.material.opacity = lerp(
			settings.opacity.min,
			settings.opacity.max,
			this.intensity
		);
		sketch.effects.passes.bloom.strength = lerp(
			settings.bloomStrength.min,
			settings.bloomStrength.max,
			this.intensity
		);
		sketch.speed = lerp(
			settings.speed.min,
			settings.speed.max,
			this.intensity
		);

		// Y

		const targetCount = lerp(
			settings.minCount,
			sketch.maxCount,
			tracker.centerY
		);
		sketch.mesh.count = lerp( sketch.mesh.count, targetCount, lerpSpeed );

	}

}

export { RainControls };
