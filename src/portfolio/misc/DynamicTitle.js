import anime from 'animejs';
import { Textformer } from 'textformer';

class DynamicTitle {

	constructor() {

		this.domElement = document.querySelector( '#menu-button' );

	}

	tween( text, backwards ) {

		if ( this.tweening ) this.tweening.pause();

		const complete = function () {

			this.tweening = null;

		}.bind( this );

		const textform = Textformer.build( {
			steps: 12,
			stagger: 8,
			from: this.domElement.innerText,
			to: text,
			output: this.domElement,
			mode: ( backwards )
				? Textformer.modes.NORMAL
				: Textformer.modes.REVERSE
		} );

		this.tweening = anime( {
			targets: textform,
			progress: 1,
			easing: 'easeInOutQuad',
			duration: 700,
			complete,
		} );

	}

}

export { DynamicTitle };
