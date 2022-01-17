
import {
	BoxGeometry,
	Color,
	Float32BufferAttribute,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	ShaderMaterial,
	EdgesGeometry,
	LineSegments,
	Uniform,
	Group,
} from 'three';

import { Sketch } from 'keda/three/Sketch';
import { Simplex } from 'keda/random/Simplex';
import { BloomPass } from 'keda/three/postprocessing/BloomPass';

import { CyberControls } from './CyberControls';
import { CyberSettings } from './CyberSettings';
import { CyberShaders } from './CyberShaders';

class Cyber extends Sketch {

	constructor( settings = {}, radialBlur ) {

		super( { defaults: CyberSettings, settings } );

		this.radialBlur = radialBlur;

		this.simplex = new Simplex( this.random );
		this.traveled = new Uniform( 0 );
		this.depth = new Uniform( this.settings.depth );
		this.speed = this.settings.speed.value;

		this.offset = 0;

	}

	init() {

		this.effects.add( 'bloom', new BloomPass( this.settings.bloom ) );

		super.init();

		this.controls = new CyberControls( this );
		//this.controls.initGUI();

	}

	initScene() {

		this.container = new Group();
		this.container.frustumCulled = false;
		this.add( this.container );

		this.initFloor();
		this.initParticles();

	}

	initFloor() {

		const {
			tile, opacity, colorNear, colorFar, elevation,
		} = this.settings.floor;

		const base = new BoxGeometry( tile.width, tile.height, tile.depth );
		const edges = new EdgesGeometry( base );

		const tileWidth = tile.width + tile.margin;
		const tileDepth = tile.depth + tile.margin;

		const columns = tile.columns;
		const rows = Math.ceil( this.depth.value / tileDepth );

		const totalWidth = tileWidth * columns;
		const totalDepth = tileDepth * rows;
		const startX = - totalWidth * 0.5;
		const startZ = 0;

		const tileCount = rows * columns;
		const attributeCount = tileCount * 3;
		const offsets = new Float32Array( attributeCount );

		let offset = 0;

		for ( let column = 0; column < columns; column ++ ) {

			const x = startX + column * tileWidth;

			for ( let row = 0; row < rows; row ++ ) {

				offsets[ offset ++ ] = x;
				offsets[ offset ++ ] = 0;
				offsets[ offset ++ ] = startZ + row * tileDepth;

			}

		}

		const geometry = new InstancedBufferGeometry();
		geometry.instanceCount = tileCount;
		geometry.setAttribute(
			'position',
			new Float32BufferAttribute().copy( edges.attributes.position )
		);
		geometry.setAttribute(
			'aOffset',
			new InstancedBufferAttribute( offsets, 3 )
		);

		this.floor = {
			geometry,
			depth: new Uniform( totalDepth ),
			colorFar: new Uniform( new Color( colorFar ) ),
			colorNear: new Uniform( new Color( colorNear ) ),
			opacity: new Uniform( opacity ),
		};

		CyberShaders.floor.uniforms = {
			opacity: this.floor.opacity,
			uColorFar: this.floor.colorFar,
			uColorNear: this.floor.colorNear,
			uDepth: this.floor.depth,
			uTraveled: this.traveled,
		};

		const material = new ShaderMaterial( CyberShaders.floor );

		const mesh = new LineSegments( geometry, material );
		mesh.frustumCulled = false;
		mesh.position.y = elevation;
		mesh.position.z = - totalDepth;
		this.container.add( mesh );

		this.floor.material = material;
		this.floor.mesh = mesh;
		base.dispose();
		edges.dispose();

		this.step = tileWidth * 4;
		this.initialX = - 2 * this.step;

	}

	initParticles() {

		const { random, simplex, settings } = this;

		const {
			color, opacity, size, count, noiseScale, bounds, variance,
		} = settings.particle;

		const base = new BoxGeometry( size, size, size * 4 );
		const edges = new EdgesGeometry( base );

		const attributeCount = count * 3;
		const offsets = new Float32Array( attributeCount );
		const speeds = new Float32Array( count );

		for ( let i = 0, j = 0; i < attributeCount; i += 3 ) {

			const z = random.number( 0, this.depth.value );
			const y = simplex.noise2D( z * noiseScale, i * noiseScale ) * bounds.y;
			const x = simplex.noise2D( y * noiseScale, z * noiseScale ) * bounds.x;

			offsets[ i ] = x;
			offsets[ i + 1 ] = y;
			offsets[ i + 2 ] = z;

			speeds[ j ++ ] = variance * ( 0.5 + simplex.noise3D( x, y, z ) * 0.5 );

		}

		const geometry = new InstancedBufferGeometry();
		geometry.instanceCount = count;
		geometry.setAttribute(
			'position',
			new Float32BufferAttribute().copy( edges.attributes.position )
		);
		geometry.setAttribute(
			'aOffset',
			new InstancedBufferAttribute( offsets, 3 )
		);
		geometry.setAttribute(
			'aSpeed',
			new InstancedBufferAttribute( speeds, 1 )
		);

		this.particles = {
			geometry,
			color: new Uniform( new Color( color ) ),
			opacity: new Uniform( opacity ),
		};

		CyberShaders.particles.uniforms = {
			color: this.particles.color,
			opacity: this.particles.opacity,
			uDepth: this.depth,
			uTraveled: this.traveled,
		};
		const material = new ShaderMaterial( CyberShaders.particles );

		const mesh = new LineSegments( geometry, material );
		mesh.frustumCulled = false;
		mesh.position.z = - this.depth.value;
		this.container.add( mesh );

		this.particles.material = material;
		this.particles.mesh = mesh;
		base.dispose();
		edges.dispose();

	}

	tick( delta ) {

		this.traveled.value += delta * this.speed;

		this.container.position.x = this.initialX + this.offset;

		super.tick( delta );

	}

}

export { Cyber };
