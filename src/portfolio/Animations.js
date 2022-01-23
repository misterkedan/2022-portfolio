import anime from 'animejs';

import { DemoScreen } from './screens/DemoScreen';
import { CoverScreen } from './screens/CoverScreen';

class Animations {

	constructor( portfolio ) {

		this.portfolio = portfolio;

	}

	tween( from, to, backwards ) {

		this.tweenProgress();
		this.tweenScreens( from, to, backwards );
		this.tweenOverlay( from, to, backwards );
		this.tweenTitle( from, to, backwards );
		this.tweenBackground( from, to, backwards );

	}

	tweenProgress() {

		this.portfolio.navProgress.tween( this.portfolio.index );

	}

	tweenScreens( from, to, backwards ) {

		if ( to.tweenIn ) to.tweenIn( backwards );
		if ( from.tweenOut ) from.tweenOut( backwards );

	}

	tweenTitle( from, to, backwards ) {

		let newTitle = ( to instanceof CoverScreen )
			? ''
			: to.id.replaceAll( '-', ' ' );
		this.portfolio.dynamicTitle.tween( newTitle, backwards );

	}

	tweenOverlay( from, to, backwards ) {

		const { overlay } = this.portfolio;

		const fromIsDemo = ( from instanceof DemoScreen );
		const toIsDemo = ( to instanceof DemoScreen );
		if ( ! fromIsDemo && toIsDemo ) overlay.tweenIn( backwards );
		else if ( fromIsDemo && ! toIsDemo ) overlay.tweenOut( backwards );

		if ( toIsDemo ) overlay.set( this.portfolio.currentScreen.id );

	}

	tweenBackground( from, to, backwards ) {

		const { mixer } = this.portfolio.background;

		if ( from.sketch === to.sketch ) return;
		if ( mixer.anime ) return mixer.anime.complete = () => {

			mixer.anime = null;
			this.tweenBackground( from, to, backwards );

		};

		let sketchA = from.sketch;
		let sketchB = to.sketch;
		let mix = [ 0, 1 ];

		if ( backwards ) {

			sketchA = to.sketch;
			sketchB = from.sketch;
			mix = [ 1, 0 ];

		}

		mixer.set( sketchA, sketchB );
		mixer.resize( window.innerWidth, window.innerHeight );
		mixer.material.uniforms.uBackwards.value = backwards;

		mixer.anime = anime( {
			duration: 550 + 100 * window.innerWidth / window.innerHeight,
			easing: 'cubicBezier(0.465, 0.450, 0.160, 1.000)',
			targets: mixer,
			complete: () => mixer.anime = null,
			mix,
		} );

	}

}

export { Animations };
