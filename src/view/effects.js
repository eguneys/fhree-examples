import * as u from '../util';

import * as G from '../graphics';

export default function view(ctrl, g) {

  const { width, height } = ctrl.data.game;

  const effects = g.makeQuad({
    program: 'effects',
    uniforms: {
      uTime: G.makeUniform1fSetter("uTime"),
      uMatrix: G.makeUniform3fvSetter("uMatrix"),
      uResolution: G.makeUniform2fSetter("uResolution"),
    }
  }, width, height);

  this.render = ctrl => {
    const { tick } = ctrl.data;

    g.addQuad(effects, {}, {
      uTime: [tick]      
    });
    
  };
  
}
