import * as u from '../util';
import { programMap } from '../shaders';

import Camera from '../fhree/camera';
import { BoxGeometry } from '../geometry';

export default function example(state, makeDrawState) {

  const { width, height, aspect } = state.canvas;

  let camera = new Camera({
    fov: u.rad(70),
    aspect
  });
  camera.pos = [0, 0, 400];

  let ds = this.drawState = makeDrawState(camera);

  let meshMap = {
    'sphereBasic': {
      program: 'basic',
      geometry: BoxGeometry(200, 200, 200)
    }
  };

  ds.makePrograms(programMap);
  ds.makeMeshes(meshMap);

  let rotate = [0, 0, 0];

  this.update = delta => {
    const dt = delta * 0.1;

    rotate[0] += dt * 0.01;
    rotate[1] += dt * 0.01;

    ds.drawMesh('sphereBasic', {
      uDiffuse: [[0x00, 0x00, 0xff]]
    }, {
      translate: [0, 0, 0],
      rotate
    });
  };
  
}
