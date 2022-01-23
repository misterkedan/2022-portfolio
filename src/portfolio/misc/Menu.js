import { Textformer } from 'textformer';
import { Tweenable } from './Tweenable';

class Menu extends Tweenable {

	constructor() {

		super( '#menu-overlay' );

		this.list = this.get( '#menu' );
		this.items = this.prepTextform( 'li' );

		this.setup();

	}

	show() {

		super.show();
		this.opened = true;

	}

	hide() {

		super.hide();
		this.opened = false;

	}

	update( hash ) {

		const filter = this.items.filter(
			item => item.element.getAttribute( 'data-ref' ) === hash
		);
		const item = filter.length ? filter.pop().element : this.items[ 0 ].element;

		const SELECTED = 'selected';
		this.currentItem?.classList.remove( SELECTED );
		item.classList.add( SELECTED );
		this.currentItem = item;

	}

	setup() {

		this.setOpacity( this.domElement, 0 );
		this.items.forEach( item => this.setOpacity( item.element, 0 ) );

	}

	tweenIn() {

		super.tweenIn();

		this.tweeningIn = this.animeIn( {
			duration: 400,
			delay: 0,
		} ).add( {
			targets: this.domElement,
			duration: 600,
			opacity: 1,
		} );

		Object.entries( this.items ).forEach( ( [ i, item ] ) => {

			const stagger = i * 20;

			this.tweeningIn.add( {
				targets: Textformer.build( {
					from: '',
					align: Textformer.align.LEFT,
					to: item.text,
					output: item.element,
				} ),
				progress: 1,
			}, 50 + stagger ).add( {
				targets: item.element,
				opacity: 1,
			}, stagger );

		} );

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = this.animeOut( {
			easing: 'easeOutQuad'
		} ).add( {
			targets: this.domElement,
			opacity: 0,
		}, 100 );

		this.items.forEach( ( item ) => {

			this.tweeningOut.add( {
				targets: Textformer.build( {
					from: item.text,
					to: '',
					align: Textformer.align.LEFT,
					output: item.element,
				} ),
				progress: 1,
				duration: 200,
			}, 0 ).add( {
				targets: item.element,
				duration: 200,
				opacity: 0,
			}, 0 );

		} );

	}

}

export { Menu };
