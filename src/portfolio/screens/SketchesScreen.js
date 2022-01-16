import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class SketchesScreen extends Screen {

	constructor( sketch ) {

		const SKETCHES = 'sketches';

		super( SKETCHES, sketch );

		this.video = this.domElement.getElementsByTagName( 'video' )[ 0 ];
		this.paragraph = this.domElement.getElementsByTagName( 'p' )[ 0 ];
		this.link = document.getElementById( `${SKETCHES}-link` );

		this.text = this.paragraph.innerText;
		this.linkText = this.link.innerText;

		this.tweenY = 1.5;

	}

	setup() {

		[ this.video, this.paragraph, this.link ].forEach(
			element => element.style.opacity = 0
		);
		this.video.style.transform = `translateY(${this.tweenY}rem)`;
		this.paragraph.style.transform = `translateY(${- this.tweenY}rem)`;
		this.link.style.transform = `translateY(${- this.tweenY}rem)`;

	}

	tweenIn() {

		super.tweenIn();


		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 300,
			duration: 600,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.video,
				opacity: 1,
				translateY: 0,
			}, 0 )
			.add( {
				targets: this.paragraph,
				opacity: 1,
				translateY: 0,
			},  0 )
			.add( {
				targets: this.link,
				opacity: 1,
				translateY: 0,
			},  150 )
			.add( {
				targets: new Textformer( {
					autoplay: false,
					output: this.paragraph,
					from: '',
					to: this.text,
					mode: Textformer.modes.BASIC,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			},  150 )
			.add( {
				targets: new Textformer( {
					autoplay: false,
					output: this.link,
					from: '',
					to: this.linkText,
					mode: Textformer.modes.EXPAND,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			}, 300 )
		;

	}

	tweenOut() {

		super.tweenOut();

		this.tweeningOut = anime.timeline( {
			easing: 'easeOutQuad',
			duration: 400,
			complete: this.completeTweenOut,
		} )
			.add( {
				targets: this.video,
				opacity: 0,
				translateY: this.tweenY,
			}, 0 )
			.add( {
				targets: this.paragraph,
				opacity: 0,
				translateY: - this.tweenY,
			},  0 )
			.add( {
				targets: this.link,
				opacity: 0,
				translateY: - this.tweenY,
			}, 0 )
			.add( {
				targets: new Textformer( {
					autoplay: false,
					output: this.paragraph,
					from: this.text,
					to: '',
					mode: Textformer.modes.COLLAPSE,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			},  0 )
			.add( {
				targets: new Textformer( {
					autoplay: false,
					output: this.link,
					from: this.linkText,
					to: '',
					mode: Textformer.modes.COLLAPSE,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			}, 0 )
		;

	}

}

export { SketchesScreen };
