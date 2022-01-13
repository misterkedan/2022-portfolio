import anime from 'animejs';
import { Textformer } from 'textformer';

class DynamicTitle {

	constructor() {

		this.domElement = document.getElementById( 'dynamic-title' );

		this.hide();

	}

	show() {

		this.domElement.style.display = 'block';

	}

	hide() {

		this.domElement.style.display = 'none';

	}


	tween( text, backwards ) {

		if ( this.tweening ) this.tweening.pause();

		this.show();

		const complete = function () {

			if ( ! this.domElement.innerText.length ) this.hide();
			this.tweening = null;

		}.bind( this );

		const textformer = new Textformer( {
			autoplay: false,
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
			targets: textformer,
			progress: 1,
			easing: 'easeInOutQuad',
			duration: 700,
			complete,
		} );

	}

}

export { DynamicTitle };
