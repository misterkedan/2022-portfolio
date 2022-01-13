import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './elements/Screen';

class Animations {

	constructor( portfolio ) {

		this.portfolio = portfolio;

		this.dynamicTitle = document.getElementById( 'dynamic-title' );

	}

	tween( from, to, backwards ) {

		this.tweenBackground( from, to, backwards );
		this.tweenGrid( from, to, backwards );
		this.tweenTitle( from, to, backwards );
		this.tweenPreviews( from, to, backwards );
		this.tweenScreens( from, to, backwards );

	}

	tweenBackground( from, to, backwards ) {

		if ( from.sketch === to.sketch ) return;

		const { mixer } = this.portfolio.background;
		let sketchA = from.sketch;
		let sketchB = to.sketch;
		let mix = [ 0, 1 ];
		if ( backwards ) {

			sketchA = to.sketch;
			sketchB = from.sketch;
			mix = [ 1, 0 ];

		}

		mixer.set( sketchA, sketchB );

		anime( {
			duration: 1000,
			easing: 'easeOutCirc',
			targets: mixer,
			mix,
		} );

	}

	tweenGrid( from, to, backwards ) {

		const { grid } = this.portfolio.background;

		if ( from.sketch !== grid && to.sketch !== grid ) return;

		const baseOffset = grid.tileSize * 21;
		const offset = ( backwards ) ? baseOffset : - baseOffset;

		anime( {
			duration: 1500,
			easing: 'easeOutCirc',
			targets: grid,
			offset: [ 0, offset ],
		} );

	}

	tweenTitle( from, to ) {

		const { title } = this.portfolio;
		const { INTRO } = Screen.types;

		const options = {
			duration: 1000,
			easing: 'easeOutQuad',
			targets: title,
		};

		if ( from.type !== INTRO && to.type === INTRO ) {

			anime( {
				...options,
				delay: 400,
				progress: 1
			} );

		} else if ( from.type === INTRO && to.type !== INTRO ) {

			anime( {
				...options,
				progress: 0
			} );

		}

	}

	tweenPreviews( from, to, backwards ) {

		const { WORKS } = Screen.types;

		const options = {
			duration: 500,
			easing: 'easeInOutQuad',
		};

		const textformOptions = {
			autoplay: false,
			steps: 8,
			stagger: 4,
			output: this.dynamicTitle,
			mode: ( backwards )
				? Textformer.modes.NORMAL
				: Textformer.modes.REVERSE
		};

		if ( from.type === WORKS ) {

			anime( {
				...options,
				targets: from.domElement,
				opacity: [ 1, 0 ],
				complete: () => from.video.pause(),
			} );

		}

		if ( to.type === WORKS ) {

			anime( {
				...options,
				targets: to.domElement,
				opacity: [ 0, 1 ],
				begin: () => to.video.play()
			} );

			const textformIn = new Textformer( {
				...textformOptions,
				to: to.id,
			} );

			anime( {
				...options,
				duration: 700,
				targets: textformIn,
				progress: 1,
			} );

		} else {

			const textformOut = new Textformer( {
				...textformOptions,
				to: '',
			} );

			anime( {
				...options,
				duration: 750,
				targets: textformOut,
				progress: 1,
			} );

		}

	}

	tweenScreens( from, to, backwards ) {

		if ( to.tweenIn ) to.tweenIn( backwards );
		if ( from.tweenOut ) from.tweenOut( backwards );

	}

}

export { Animations };
