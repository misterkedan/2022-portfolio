import { Textformer } from 'textformer';

class Title {

	constructor() {

		const options = {
			autoplay: false,
			from: '',
			steps: 8,
			stagger: 6,
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

	}

	get progress() {

		return this.textformers[ 0 ].progress;

	}

	set progress( progress ) {

		this.textformers.forEach( textformer => textformer.progress = progress );

	}

}

export { Title };
