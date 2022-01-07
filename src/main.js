import { Portfolio } from './portfolio/Portfolio';

function init() {

	try {

		document.documentElement.classList.add( 'debug' );
		document.documentElement.classList.add( 'initing' );

		const portfolio = new Portfolio();
		console.log( portfolio );

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
