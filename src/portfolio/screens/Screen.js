import { Tweenable } from '../misc/Tweenable';

class Screen extends Tweenable {

	constructor( id, sketch ) {

		super( `#${id}` );

		this.id = id;
		this.sketch = sketch;

	}

}

export { Screen };
