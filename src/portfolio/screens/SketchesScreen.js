import { ProjectScreen } from './ProjectScreen';

class SketchesScreen extends ProjectScreen {

	constructor( sketch ) {

		const SKETCHES = 'sketches';

		super( SKETCHES, sketch );

	}

}

export { SketchesScreen };
