import { Screen } from './Screen';

class DemoScreen extends Screen {

	constructor( { id, sketch } ) {

		super( { id, sketch, type: Screen.types.INTRO } );

	}

}

export { DemoScreen };
