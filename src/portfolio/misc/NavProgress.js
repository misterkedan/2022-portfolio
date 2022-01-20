import anime from 'animejs';
import { Tweenable } from './Tweenable';

class NavProgress extends Tweenable {

	constructor( max ) {

		super( document.getElementById( 'nav-progress' ) );

		this.max = max;
		this.bar = this.get( '#nav-progress-bar' );

	}

	tween( to ) {

		const width = ( Math.min(
			Math.max( to / this.max, 0 ), this.max
		) ).toPrecision( 2 );

		anime( {
			duration: 500,
			easing: 'easeInOutQuad',
			targets: this.bar,
			scaleX: width,
		} );

	}

}

export { NavProgress };
