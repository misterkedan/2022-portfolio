import { ShaderUtils } from 'keda/three/misc/ShaderUtils';

const RainShader = {};

/*-----------------------------------------------------------------------------/

	Main

/-----------------------------------------------------------------------------*/

const vertexHead = /*glsl*/`
attribute float aProgress;
varying float vProgress;
`;

const vertexBody =  /*glsl*/`
	vProgress = aProgress;
`;

const fragmentHead = /*glsl*/`
varying float vProgress;
`;

const fragmentBody = /*glsl*/`
	diffuseColor.a *= mod( 1.0 - vProgress, 1.0 );
`;

RainShader.edit = ( shader ) => ShaderUtils.editBasic(
	shader, vertexHead, vertexBody, fragmentHead, fragmentBody
);

export { RainShader };
