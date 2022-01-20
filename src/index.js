import { Portfolio } from './portfolio/Portfolio';

function init() {

	const nojs = 'nojs';

	if ( new RegExp( nojs ).test( window.location.search ) ) {

		document.documentElement.classList.remove( 'init' );
		return;

	}

	try {

		const portfolio = new Portfolio();
		portfolio.load();

		// classList.replace fails on some older browsers
		document.documentElement.classList.remove( nojs );
		document.documentElement.classList.add( 'js' );

	} catch ( error ) {

		console.error( error );

		//setTimeout( () => window.location.search = nojs, 3000 );

	}

}

init();
