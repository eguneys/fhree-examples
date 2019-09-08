import DrawState from '../fhree/state';

import geoPlane from './geoPlane';
import geoCube from './geoCube';
import matBasic from './matBasic';

export default function examples(state, gl) {

  const makeDrawState = camera => new DrawState(gl, camera);

  let examples = {
    geoCube: () => new geoCube(state, makeDrawState),
    matBasic: () => new matBasic(state, makeDrawState),
    geoPlane: () => new geoPlane(state, makeDrawState)
  };

  let currentExample = examples['geoPlane']();

  this.update = delta => {
    currentExample.update(delta);

    currentExample.drawState.render();
  };
  
}
