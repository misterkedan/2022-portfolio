import { Portfolio } from './portfolio/Portfolio';

function init() {

	const nojs = 'nojs';
	if ( window.location.search === `?${nojs}` ) {

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
		//window.location.search = nojs;

	}

}

init();
