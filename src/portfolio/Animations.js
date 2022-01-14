import anime from 'animejs';
import { DynamicTitle } from './misc/DynamicTitle';
import { Title } from './misc/Title';
import { DemoScreen } from './screens/DemoScreen';
import { WorksScreen } from './screens/WorksScreen';

class Animations {

	constructor( portfolio ) {

		this.portfolio = portfolio;

		this.title = new Title();
		this.dynamicTitle = new DynamicTitle();

	}

	tween( from, to, backwards ) {

		this.tweenBackground( from, to, backwards );
		this.tweenGrid( from, to, backwards );
		this.tweenTitles( from, to, backwards );
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
		mixer.resize( window.innerWidth, window.innerHeight );
		mixer.material.uniforms.uBackwards.value = backwards;

		anime( {
			duration: 1000,
			easing: 'easeInOutCirc',
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

	tweenTitles( from, to, backwards ) {

		const fromIsDemo = ( from instanceof DemoScreen );
		const toIsDemo = ( to instanceof DemoScreen );
		if ( ! fromIsDemo && toIsDemo ) this.title.tweenIn();
		else if ( fromIsDemo && ! toIsDemo ) this.title.tweenOut();

		const fromIsWork = ( from instanceof WorksScreen );
		const toIsWork = ( to instanceof WorksScreen );
		if ( ! fromIsWork && ! toIsWork ) return;
		const dynamicTitle = ( toIsWork ) ? to.id : '';
		this.dynamicTitle.tween( dynamicTitle, backwards );

	}

	tweenScreens( from, to, backwards ) {

		if ( to.tweenIn ) to.tweenIn( backwards );
		if ( from.tweenOut ) from.tweenOut( backwards );

	}

}

export { Animations };
