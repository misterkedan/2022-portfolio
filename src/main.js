import { Portfolio } from './portfolio/Portfolio';

function init() {

	const html = document.documentElement;

	try {

		html.classList.add( 'debug' );
		html.classList.add( 'initing' );

		const portfolio = new Portfolio();

		requestAnimationFrame( () => {

			html.classList.remove( 'initing' );

			// classList.replace fails on some older browsers
			html.classList.remove( 'no-js' );
			html.classList.add( 'js' );

			portfolio.load();

			console.log( portfolio );

		} );


	} catch ( error ) {

		console.error( error );
		html.classList.remove( 'initing' );

	}

}

init();
