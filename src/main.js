function init() {

	try {

		document.documentElement.classList.add( 'initing' );



		requestAnimationFrame( () => {

			document.documentElement.classList.remove( 'initing' );
			document.documentElement.classList.replace( 'no-js', 'js' );

		} );


	} catch ( error ) {

		console.error( error );
		document.documentElement.classList.remove( 'initing' );

	}

}

init();
