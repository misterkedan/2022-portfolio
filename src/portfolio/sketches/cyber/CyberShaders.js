import { ShaderUtils } from 'keda/three/misc/ShaderUtils';

const CyberShaders = {};

/*-----------------------------------------------------------------------------/

	Floor

/-----------------------------------------------------------------------------*/

CyberShaders.floor = ShaderUtils.getBase();

CyberShaders.floor.vertexShader = /*glsl*/`
attribute vec3 aOffset;
uniform float uDepth;
uniform float uTraveled;
varying float vProgress;

void main() {

	vec3 offset = aOffset;
	offset.z = mod( offset.z + uTraveled, uDepth );

	vProgress =  offset.z / uDepth;
	
	vec3 transformed = position + offset;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );

}
`;

CyberShaders.floor.fragmentShader =  /*glsl*/`
uniform float opacity;

uniform vec3 uColorFar;
uniform vec3 uColorNear;
varying float vProgress;

void main() {


	vec3 dynamicColor = mix( uColorFar, uColorNear, vProgress );
	gl_FragColor = vec4( dynamicColor, opacity );

}
`;

/*-----------------------------------------------------------------------------/

	Particles

/-----------------------------------------------------------------------------*/

CyberShaders.particles = ShaderUtils.getBase();

CyberShaders.particles.vertexShader = /*glsl*/`
attribute float aSpeed;
attribute vec3 aOffset;
uniform float uDepth;
uniform float uTraveled;
varying float vIntensity;

${ ShaderUtils.parabola }

void main() {

	vec3 offset = aOffset;
	offset.z = mod( offset.z + uTraveled * aSpeed, uDepth );

	float progress = offset.z / uDepth;
	vIntensity = pow( progress, 2.0 );

	float scale = mix( progress, parabola( progress, 2.0 ), 0.8 );

	vec3 transformed = position * scale + offset;
	transformed.z *= aSpeed * 1.5;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );

}
`;

CyberShaders.particles.fragmentShader =  /*glsl*/`
uniform vec3 color;
uniform float opacity;
varying float vIntensity;

void main() {

	vec3 dynamicColor = color;
	float dynamicOpacity = opacity * vIntensity;

	gl_FragColor = vec4( dynamicColor, opacity );

}
`;

export { CyberShaders };
