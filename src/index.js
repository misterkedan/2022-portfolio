import { Portfolio } from './portfolio/Portfolio';

function init() {

	const nojs = 'nojs';

	if ( new RegExp( nojs ).test( window.location.search ) ) {

		document.documentElement.classList.remove( 'init' );
		return;

	}

	const fade = document.createElement( 'div' );
	fade.setAttribute( 'id', 'fade' );
	document.body.appendChild( fade );

	try {

		const portfolio = new Portfolio();
		portfolio.load();

		// classList.replace fails on some older browsers
		document.documentElement.classList.remove( nojs );
		document.documentElement.classList.add( 'js' );

		requestAnimationFrame( () =>
			document.getElementById( 'fade' ).classList.add( 'out' )
		);

	} catch ( error ) {

		console.error( error );

		//setTimeout( () => window.location.search = nojs, 5000 );

	}

}

init();
