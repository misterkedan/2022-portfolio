import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from '../screens/Screen';

class AboutScreen extends Screen {

	constructor( sketch ) {

		const { ABOUT } = Screen.types;

		super( { type: ABOUT, sketch, id: ABOUT } );

		this.elements = [
			`${ABOUT}-1`,
			`${ABOUT}-2`,
			`${ABOUT}-3a`,
			'tools',
			`${ABOUT}-3b`,
			'affinities',
			`${ABOUT}-3c`,
			`${ABOUT}-4`,
		].map( id => document.getElementById( id ) );
		this.texts = this.elements.map( element => element.innerText );
		this.lengths = this.texts.map( text => text.length );
		this.staggers = this.lengths.reduce( ( result, length ) => {

			result.total += length;
			result.array.push( result.total );
			return result;

		}, { array: [], total: 0 } ).array;

		this.selfie = document.getElementById( 'selfie' );
		this.tools = document.getElementById( 'tools' );
		this.affinities = document.getElementById( 'affinities' );

		this.offset = 120;
		this.setup();
		this.hide();

	}

	setup( backwards ) {

		const translation = ( backwards ) ? - this.offset : this.offset;

		const setStyle = ( element ) => {

			element.style.opacity = 0;
			element.style.transform = `translateX(${translation}px)`;

		};

		setStyle( this.selfie );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

			element.innerText = this.texts[ i ];
			setStyle( element );

		} );

	}

	tweenIn( backwards ) {

		if ( this.tweeningIn ) this.tweeningIn.pause();
		if ( this.tweeningOut ) {

			this.tweeningOut.pause();
			this.tweeningOut = null;

		}

		const begin = function () {

			if ( ! this.tweeningIn && ! this.tweeningOut ) this.setup( backwards );
			this.show();

		}.bind( this );

		const complete = function () {

			if ( this.tweeningIn?.reversed ) this.hide();
			this.tweeningIn = null;

		}.bind( this );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 300,
			duration: 700,
			begin,
			complete,
		} )
			.add( {
				targets: this.selfie,
				opacity: 1,
				translateX: 0,
			}, 100 );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

			const duration = Math.max( this.lengths[ i ] * 8, 700 );
			const delay = this.staggers[ i ];

			const textformer = new Textformer( {
				output: element,
				from: '',
				to: this.texts[ i ],
				mode: Textformer.modes.REVERSE,
				autoplay: false,
				align: Textformer.align.LEFT,
			} );

			this.tweeningIn
				.add( {
					targets: textformer,
					duration,
					delay,
					progress: 1,
				}, 0 )
				.add( {
					targets: element,
					duration,
					delay,
					translateX: 0,
					opacity: 1
				}, 100 );

		} );

	}

	tweenOut( backwards ) {

		if ( this.tweeningOut ) this.tweeningOut.pause();
		if ( this.tweeningIn ) {

			this.tweeningIn.pause();
			this.tweeningIn = null;

		}

		const complete = function () {

			if ( ! this.tweeningOut?.reversed  ) this.hide();
			this.tweeningOut = null;

		}.bind( this );

		const translation = ( backwards ) ? this.offset : - this.offset;

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 500,
			complete,
		} )
			.add( {
				targets: this.selfie,
				opacity: 0,
				translateX: translation,
			}, 0 );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

			const duration = Math.max( this.lengths[ i ] * 4, 400 );
			const delay = this.staggers[ i ] * 0.6;

			const textformer = new Textformer( {
				output: element,
				from: this.texts[ i ],
				to: '',
				autoplay: false,
				align: Textformer.align.LEFT,
			} );

			this.tweeningOut
				.add( {
					targets: textformer,
					duration,
					delay,
					progress: 1,
				}, 0 )
				.add( {
					targets: element,
					duration,
					delay,
					translateX: translation,
					opacity: 0
				}, 100 );

		} );

	}

}

export { AboutScreen };
