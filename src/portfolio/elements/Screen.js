class Screen {

	constructor( { type, id, sketch } = {} ) {

		this.type = type;
		this.sketch = sketch;

		this.id = id;
		this.domElement = document.getElementById( id );

	}

	show() {

		this.domElement.style.display = 'flex';

	}

	hide() {

		this.domElement.style.display = 'none';

	}

}

Screen.types  = {
	HOME: 'home',
	INTRO: 'intro',
	WORKS: 'works',
	INFO: 'info',
};

export { Screen };
