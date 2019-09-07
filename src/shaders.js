import { objMap } from './util2';

import vMainShader from './shaders/main.vert';
import fMainShader from './shaders/main.frag';

import vTextureShader from './shaders/texture.vert';
import fTextureShader from './shaders/texture.frag';

import pFColorsShader from './shaders/colors.partial.frag';
import pFDefsShader from './shaders/defs.partial.frag';
import pFUtilShader from './shaders/util.partial.frag';

const partialShaders = {
  'futil': pFUtilShader,
  'fdefs': pFDefsShader,
  'fcolors': pFColorsShader,
};

const rawShaders = {
  'vmain': vMainShader,
  'fmain': fMainShader,
  'vtexture': vTextureShader,
  'ftexture': fTextureShader
};

const shaderMap = objMap(rawShaders,
                         (_, v) => process(v));

const shaderPair = (vSource, fSource) => ({
  vSource: shaderMap[vSource],
  fSource: shaderMap[fSource]
});


export const programMap = ({
  'main': shaderPair('vmain', 'fmain'),
  'texture': shaderPair('vtexture', 'ftexture')
});


function process(source) {
  const regexInclude = /#include (\w+)/;

  const matches = source.match(regexInclude);

  if (matches) {

    const match = matches[1];

    source = source.replace(matches[0], partialShaders[matches[1]]);

    return process(source);
  } else {
    return source;
  }
}

export default shaderMap;
