import { Portfolio } from './portfolio/Portfolio';

function init( debug ) {

	const html = document.documentElement;

	try {

		html.classList.add( 'debug' );
		html.classList.add( 'initing' );

		const portfolio = new Portfolio();

		requestAnimationFrame( () => {

			portfolio.load();
			if ( debug ) console.log( portfolio );

			html.classList.remove( 'initing' );

			// classList.replace fails on some older browsers
			html.classList.remove( 'no-js' );
			html.classList.add( 'js' );

		} );


	} catch ( error ) {

		console.error( error );

		requestAnimationFrame( () => html.classList.remove( 'initing' ) );

	}

}

init( true );
