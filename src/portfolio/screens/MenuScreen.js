import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class MenuScreen extends Screen {

	constructor( sketch ) {

		super( 'menu', sketch );

		this.items = this.getAll( 'li' );
		this.names = this.prepTextform( '.menu-item-title' );
		this.summaries = this.prepTextform( '.menu-item-summary' );

		this.tweenX = 12;

		this.setup();

	}

	setup( backwards ) {

		const tweenX = ( backwards ) ? - this.tweenX : this.tweenX;

		const transform = `translateX(${tweenX}rem)`;

		const setStyle = ( item ) => {

			item.element.style.opacity = 0;
			item.element.style.transform = transform;

		};

		this.names.forEach( setStyle );
		this.summaries.forEach( setStyle );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		const tweeningIn = anime.timeline( {
			complete: this.completeTweenIn,
			easing: 'easeOutCirc',
			duration: 500,
			delay: 100,
		} );
		this.tweeningIn = tweeningIn;

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 100;

			tweeningIn.add( {
				targets: new Textformer( {
					autoplay: false,
					//mode: Textformer.modes.EXPAND,
					align: Textformer.align.LEFT,
					//steps: 30,
					//stagger: 15,
					from: '',
					to: item.text,
					output: item.element,
				} ),
				progress: 1,
			}, 150 + stagger );

			tweeningIn.add( {
				targets: item.element,
				opacity: 1,
				translateX: 0,
			}, stagger );

		};

		Object.entries( this.names ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		Object.entries( this.summaries ).forEach(
			( [ i, item ] ) => addTextformer( i, item, 100 )
		);

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const tweenX = ( backwards ) ? this.tweenX : - this.tweenX;

		const tweeningOut = anime.timeline( {
			complete: this.completeTweenOut,
			duration: 300,
			easing: 'easeInOutQuad',
		} );
		this.tweeningOut = tweeningOut;

		const addTextformer = function ( i, item, delay = 0 ) {

			const stagger = delay + i * 30;

			tweeningOut.add( {
				targets: new Textformer( {
					autoplay: false,
					mode: Textformer.modes.REVERSE,
					align: Textformer.align.LEFT,
					from: item.text,
					to: '',
					output: item.element,
				} ),
				progress: 1,
			}, stagger );

			tweeningOut.add( {
				targets: item.element,
				opacity: 0,
				translateX: tweenX,
			}, stagger );

		};

		Object.entries( this.names ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

		Object.entries( this.summaries ).forEach(
			( [ i, item ] ) => addTextformer( i, item )
		);

	}

}

export { MenuScreen };
