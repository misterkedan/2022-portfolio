import { Textformer } from 'textformer';
import { Screen } from './Screen';

class OtherProjectsScreen extends Screen {

	constructor( sketch ) {

		super( 'other-projects', sketch );

		this.items = this.getAll( 'li' );
		this.names = this.prepTextform( '.other-project-title' );
		this.summaries = this.prepTextform( '.other-project-summary' );

		this.offsetX = 12;

		this.setup();

	}

	setup( backwards ) {

		const x = ( backwards ) ? - this.offsetX : this.offsetX;

		const setStyle = ( item ) => {

			this.setOpacity( item.element, 0 );
			this.setX( item.element, x );

		};

		this.names.forEach( setStyle );
		this.summaries.forEach( setStyle );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		this.tweeningIn = this.animeIn( { delay: 0 } );

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 50;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					align: Textformer.align.LEFT,
					from: '',
					to: item.text,
					output: item.element,
				} ),
				progress: 1,
			}, 150 + stagger );

			this.tweeningIn.add( {
				targets: item.element,
				opacity: 1,
				translateX: 0,
			}, stagger );

		}.bind( this );

		Object.entries( this.names ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		Object.entries( this.summaries ).forEach(
			( [ i, item ] ) => addTextformer( i, item, 100 )
		);

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const translateX = ( backwards ) ? this.offsetX : - this.offsetX;

		this.tweeningOut = this.animeOut();

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 30;

			this.tweeningOut.add( {
				targets: Textformer.build( {
					mode: Textformer.modes.REVERSE,
					align: Textformer.align.LEFT,
					from: item.text,
					to: '',
					output: item.element,
				} ),
				progress: 1,
			}, stagger );

			this.tweeningOut.add( {
				targets: item.element,
				opacity: 0,
				translateX,
			}, stagger );

		}.bind( this );

		Object.entries( this.names ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		Object.entries( this.summaries ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

	}

}

export { OtherProjectsScreen };
