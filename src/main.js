import { Portfolio } from './portfolio/Portfolio';

function init() {

	const NO_JS = '?nojs';

	if ( window.location.search === NO_JS ) return;

	const html = document.documentElement;

	try {

		const portfolio = new Portfolio();

		requestAnimationFrame( () => {

			portfolio.load();

			// classList.replace fails on some older browsers
			html.classList.remove( 'no-js' );
			html.classList.add( 'js' );

		} );

	} catch ( error ) {

		console.error( error );

		//window.location.search = NO_JS;

	}

}

init();
