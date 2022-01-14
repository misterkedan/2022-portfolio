import anime from 'animejs';
import { Textformer } from 'textformer';
import { Screen } from './Screen';

const DATA_MODE = 'data-mode';

class WorksScreen extends Screen {

	constructor( id, sketch ) {

		super( id, sketch );

		this.video = this.domElement.getElementsByTagName( 'video' )[ 0 ];
		this.paragraphs = Array.from( this.domElement.getElementsByTagName( 'p' ) );
		this.texts = this.paragraphs.map( paragraph => paragraph.innerText );

		Object.entries( this.paragraphs ).forEach( ( [ i, paragraph ] ) => {

			if ( i < 1 )
				paragraph.setAttribute( DATA_MODE, Textformer.modes.REVERSE );
			else if ( i < this.paragraphs.length - 1 )
				paragraph.setAttribute( DATA_MODE, Textformer.modes.EXPAND );
			else
				paragraph.setAttribute( DATA_MODE, Textformer.modes.BASIC );

		} );

		this.translation = 100;

	}

	show() {

		super.show();
		this.video.play();

	}

	hide() {

		super.hide();
		this.video.pause();

	}

	setup( backwards ) {

		const translation = ( backwards )
			? - this.translation
			:  this.translation;

		const transform = `translateX(${translation}px)`;

		this.video.style.opacity = 0;
		this.video.style.transform = transform;

		this.paragraphs.forEach( paragraph => paragraph.style.opacity = 0 );

	}

	tweenIn( backwards ) {

		super.tweenIn( backwards );

		this.tweeningIn = anime.timeline( {
			easing: 'easeOutCirc',
			delay: 400,
			duration: 700,
			complete: this.completeTweenIn,
		} )
			.add( {
				targets: this.video,
				opacity: 1,
				translateX: 0,
			}, 0 );

		Object.entries( this.paragraphs ).forEach( ( [ i, paragraph ] )=>{

			const stagger = i * 50;
			const text = this.texts[ i ];

			const textformer = new Textformer( {
				output: paragraph,
				from: '',
				to: text,
				//steps: 30,
				mode: paragraph.getAttribute( DATA_MODE ),
				autoplay: false,
				align: Textformer.align.LEFT,
			} );

			this.tweeningIn
				.add( {
					targets: paragraph,
					opacity: 1,
					translateX: 0,
				},  stagger )
				.add( {
					targets: textformer,
					duration: text.length * 5,
					progress: 1,
				}, stagger );

		} );


	}

	tweenOut( backwards ) {

		super.tweenOut( backwards );

		const translation = ( backwards )
			? this.translation
			: - this.translation;

		this.tweeningOut = anime.timeline( {
			easing: 'easeInOutQuad',
			duration: 400,
			complete: this.completeTweenOut,
		} )
			.add( {
				targets: this.video,
				opacity: 0,
				translateX: translation,
			}, 0 );

		Object.entries( this.paragraphs ).forEach( ( [ i, paragraph ] ) => {

			const stagger = i * 50;
			const text = this.texts[ i ];

			const textformer = new Textformer( {
				output: paragraph,
				from: text,
				to: '',
				mode: Textformer.modes.COLLAPSE,
				autoplay: false,
				align: Textformer.align.LEFT,
			} );

			this.tweeningOut
				.add( {
					targets: paragraph,
					opacity: 0,
					translateX: translation,
				},  stagger )
				.add( {
					targets: textformer,
					duration: text.length * 3,
					progress: 1,
				}, stagger );

		} );

	}

}

export { WorksScreen };
