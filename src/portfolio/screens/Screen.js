import { Tweenable } from '../misc/Tweenable';

class Screen extends Tweenable {

	constructor( id, sketch ) {

		super( document.getElementById( id ), 'flex' );

		this.id = id;
		this.sketch = sketch;

	}

	get( selector ) {

		return this.domElement.querySelector( selector );

	}

	getAll( selector ) {

		return this.domElement.querySelectorAll( selector );

	}

	prepTextform( selector ) {

		return Array.from( this.getAll( selector ) ).map( ( element ) => {

			return {
				element: element,
				text: element.innerText
			};

		} );

	}

}

Screen.setX = ( element, x ) => {

	element.style.transform = `translateX(${x}rem)`;

};

Screen.setY = ( element, y ) => {

	element.style.transform = `translateY(${y}rem)`;

};

Screen.setOpacity = ( element, opacity ) => {

	element.style.opacity = opacity;

};



export { Screen };
