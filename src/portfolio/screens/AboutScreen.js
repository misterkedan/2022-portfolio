import anime from 'animejs';
import { Textformer } from 'textformer';
import { AboutShuffler } from '../misc/AboutShuffler';
import { Screen } from '../screens/Screen';

class AboutScreen extends Screen {

	constructor( sketch ) {

		const ABOUT = 'about';

		super( `${ABOUT}-me`, sketch );

		this.elements = [
			`${ABOUT}-1`,
			`${ABOUT}-2`,
			`${ABOUT}-3`,
			`${ABOUT}-4a`,
			'tools',
			`${ABOUT}-4b`,
			'affinities',
			`${ABOUT}-4c`,
		].map( id => document.getElementById( id ) );
		this.texts = this.elements.map( element => element.innerText );
		//this.lengths = this.texts.map( text => text.length );
		//this.staggers = this.lengths.reduce( ( result, length ) => {

		//	result.total += length * 0.4;
		//	result.array.push( result.total );
		//	return result;

		//}, { array: [], total: 0 } ).array;

		this.selfie = document.getElementById( 'selfie' );

		this.shuffler = new AboutShuffler();

		this.tweenX = 10;

	}

	show() {

		super.show();
		this.shuffler.enable();

	}

	hide() {

		super.hide();
		this.shuffler.disable();

	}

	setup( backwards ) {

		const tweenX = ( backwards ) ? - this.tweenX : this.tweenX;

		const setStyle = ( element ) => {

			element.style.opacity = 0;
			element.style.transform = `translateX(${tweenX}rem)`;

		};

		setStyle( this.selfie );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

			element.innerText = this.texts[ i ];
			setStyle( element );

		} );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 250,
			duration: 650,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.selfie,
				opacity: 1,
				translateX: 0,
			}, 100 );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

			//const duration = Math.min(
			//	Math.max( this.lengths[ i ] * 8, 300 ), 500
			//);
			//const stagger = this.staggers[ i ];

			const textformer = new Textformer( {
				output: element,
				from: '',
				to: this.texts[ i ],
				mode: Textformer.modes.REVERSE,
				steps: 30,
				stagger: 30,
				autoplay: false,
				align: Textformer.align.LEFT,
			} );

			const stagger = Math.sqrt( i ) * 100;

			this.tweeningIn
				.add( {
					targets: textformer,
					//duration,
					progress: 1,
				}, stagger )
				.add( {
					targets: element,
					//duration,
					translateX: 0,
					opacity: 1
				}, stagger + 100 );

		} );

	}

	tweenOut( backwards ) {

		super.tweenOut();

		const tweenX = ( backwards ) ? this.tweenX : - this.tweenX;

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 400,
			complete: this.completeTweenOut,
		} )
			.add( {
				targets: this.selfie,
				opacity: 0,
				translateX: tweenX,
			}, 0 );

		Object.entries( this.elements ).forEach( ( [ i, element ] ) => {

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
					progress: 1,
				}, 0 )
				.add( {
					targets: element,
					translateX: tweenX,
					opacity: 0
				}, 100 );

		} );

	}

}

export { AboutScreen };
