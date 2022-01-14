import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class ShowcaseScreen extends Screen {

	constructor( sketch ) {

		super( 'showcase', sketch );

		this.title = document.getElementById( 'showcase-main' );
		this.subtitle = document.getElementById( 'showcase-sub' );

		this.titleText = this.title.innerText;
		this.subtitleText = this.subtitle.innerText;

		this.translation = 240;

	}

	setup( backwards ) {

		console.log( '?' );
		const translation = ( backwards )
			? - this.translation
			:  this.translation;

		const transform = `translateX(${translation}px)`;

		[ this.title, this.subtitle ].forEach( element => {

			element.style.opacity = 0;
			element.style.transform = transform;

		} );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		const title = new Textformer( {
			autoplay: false,
			mode: Textformer.modes.EXPAND,
			output: this.title,
			from: '',
			to: this.titleText,
		} );

		const subtitle = new Textformer( {
			autoplay: false,
			mode: Textformer.modes.EXPAND,
			output: this.subtitle,
			from: '',
			to: this.subtitleText,
		} );

		this.tweeningIn = anime.timeline( {
			complete: this.completeTweenIn,
			easing: 'easeOutCirc',
			duration: 800,
			delay: 600,
		} )
			.add( { targets: title, 		progress: 1 }, 0 )
			.add( { targets: subtitle, 		progress: 1 }, 0 )
			.add( {
				targets: this.title,
				opacity: 1,
				translateX: 0,
			}, 0 )
			.add( {
				targets: this.subtitle,
				opacity: 1,
				translateX: 0,
			}, 0 );

	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const translation = ( backwards )
			? this.translation
			: - this.translation;

		const title = new Textformer( {
			autoplay: false,
			mode: Textformer.modes.COLLAPSE,
			output: this.title,
			from: this.titleText,
			to: '',
		} );

		const subtitle = new Textformer( {
			autoplay: false,
			mode: Textformer.modes.COLLAPSE,
			output: this.subtitle,
			from: this.subtitleText,
			to: '',
		} );

		this.tweeningOut = anime.timeline( {
			complete: this.completeTweenOut,
			duration: ( backwards ) ? 300 : 500,
			easing: 'easeOutQuad',
		} )
			.add( { targets: title,		progress: 1 }, 0 )
			.add( { targets: subtitle,	progress: 1 }, 0 )
			.add( {
				targets: this.title,
				opacity: 0,
				translateX: translation,
			}, 0 )
			.add( {
				targets: this.subtitle,
				opacity: 0,
				translateX: translation,
			}, 0 );

	}

}

export { ShowcaseScreen };
