import DrawState from '../fhree/state';

import geoCube from './geoCube';
import matBasic from './matBasic';

export default function examples(state, gl) {

  const makeDrawState = camera => new DrawState(gl, camera);

  let examples = {
    geoCube: () => new geoCube(state, makeDrawState),
    matBasic: () => new matBasic(state, makeDrawState)
  };

  let currentExample = examples['matBasic']();

  this.update = delta => {
    currentExample.update(delta);

    currentExample.drawState.render();
  };
  
}
