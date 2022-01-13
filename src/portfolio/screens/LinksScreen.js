import { Screen } from './Screen';

class LinksScreen extends Screen {

	constructor( sketch ) {

		super( { id:'links', sketch, type: Screen.types.ABOUT } );

	}

	tweenIn() {

		this.show();

	}

	tweenOut() {

		this.hide();

	}

}

export { LinksScreen };
