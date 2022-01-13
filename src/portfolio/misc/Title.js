import anime from 'animejs';
import { Textformer } from 'textformer';

class Title {

	constructor() {

		const options = {
			autoplay: false,
			from: '',
			steps: 20,
			stagger: 10,
			align: Textformer.align.LEFT,
		};

		const firstName = new Textformer( {
			...options,
			output: '#name-first',
			mode: Textformer.modes.REVERSE,
		} );

		const alias = new Textformer( {
			...options,
			output: '#name-alias',
			mode: Textformer.modes.EXPAND,
		} );

		const vocation = new Textformer( {
			...options,
			output: '#vocation',
		} );

		this.textformers = [ firstName, alias, vocation ];

		this.progress = 0;

	}

	tweenIn() {

		if ( this.tweeningIn ) this.tweeningIn.pause();
		if ( this.tweeningOut ) {

			this.tweeningOut.pause();
			this.tweeningOut = null;

		}

		this.tweeningIn = anime( {
			duration: 1200,
			delay: 400,
			easing: 'easeOutCirc',
			targets: this,
			progress: 1
		} );

	}

	tweenOut() {

		if ( this.tweeningOut ) this.tweeningOut.pause();
		if ( this.tweeningIn ) {

			this.tweeningIn.pause();
			this.tweeningIn = null;

		}

		this.tweeningOut = anime( {
			duration: 600,
			easing: 'easeOutCirc',
			targets: this,
			progress: 0
		} );

	}

	get progress() {

		return this.textformers[ 0 ].progress;

	}

	set progress( progress ) {

		this.textformers.forEach(
			textformer => textformer.progress = progress
		);

	}

}

export { Title };
