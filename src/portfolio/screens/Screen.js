import { Tweenable } from '../misc/Tweenable';

class Screen extends Tweenable {

	constructor( id, sketch ) {

		super( document.getElementById( id ), 'flex' );

		this.id = id;
		this.sketch = sketch;

	}

}

export { Screen };
