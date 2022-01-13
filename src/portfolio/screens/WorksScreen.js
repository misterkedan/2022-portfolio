import { Screen } from './Screen';

class WorksScreen extends Screen {

	constructor( { id, sketch } ) {

		super( { id, sketch, type: Screen.types.WORKS } );

		this.video = this.domElement.getElementsByTagName( 'video' )[ 0 ];
		this.video.pause();

		this.text = this.domElement.getElementsByClassName( 'description' )[ 0 ];

	}

}

export { WorksScreen };
