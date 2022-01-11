import { Portfolio } from './portfolio/Portfolio';

function init( debug ) {

	debug = true;

	const NO_JS = '?nojs';

	if ( window.location.search === NO_JS ) return;

	const html = document.documentElement;

	try {

		html.classList.add( 'initing' );

		const portfolio = new Portfolio();

		requestAnimationFrame( () => {

			portfolio.load();

			if ( debug ) console.log( portfolio );

			// classList.replace fails on some older browsers
			html.classList.remove( 'no-js' );
			html.classList.add( 'js' );

		} );


	} catch ( error ) {

		if ( debug ) return console.error( error );

		window.location.search = NO_JS;

	}

}

//document.documentElement.classList.add( 'initing' );
//setTimeout( init, 3000 );

init();
