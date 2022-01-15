import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

class MoreScreen extends Screen {

	constructor( sketch ) {

		const MORE = 'more';

		super( MORE, sketch );

		this.title = document.getElementById( `${MORE}-title` );
		this.video = this.domElement.getElementsByTagName( 'video' )[ 0 ];
		this.paragraph = this.domElement.getElementsByTagName( 'p' )[ 0 ];
		this.link = document.getElementById( `${MORE}-link` );

		this.text = this.paragraph.innerText;
		this.titleText = this.title.innerText;
		this.linkText = this.link.innerText;

		this.tweenY = 25;

	}

	setup() {

		[ this.title, this.video, this.paragraph, this.link ].forEach(
			element => element.style.opacity = 0
		);
		this.title.style.transform = `translateY(${this.tweenY}px)`;
		this.video.style.transform = `translateY(${this.tweenY}px)`;
		this.paragraph.style.transform = `translateY(${- this.tweenY}px)`;
		this.link.style.transform = `translateY(${- this.tweenY}px)`;

	}

	tweenIn() {

		super.tweenIn();


		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 500,
			duration: 700,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.title,
				opacity: 1,
				translateY: 0,
			},  150 )
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
					output: this.title,
					from: '',
					to: this.titleText,
					mode: Textformer.modes.EXPAND,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			},  300 )
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
				targets: this.title,
				opacity: 0,
				translateY: this.tweenY,
			},  0 )
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
					output: this.title,
					from: this.titleText,
					to: '',
					mode: Textformer.modes.COLLAPSE,
					align: Textformer.align.LEFT,
				} ),
				progress: 1,
			},  0 )
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

export { MoreScreen };
