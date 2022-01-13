class Screen {

	constructor( id, sketch ) {

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

export { Screen };
