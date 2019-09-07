import * as u from '../util';
import { programMap } from '../shaders';

import Camera from '../fhree/camera';
import { BoxGeometry } from '../geometry';

export default function example(state, makeDrawState) {

  const { width, height } = state.canvas;

  let camera = new Camera({
    fov: u.rad(40)
  });
  camera.pos = [0, 0, 400];

  let ds = this.drawState = makeDrawState(camera);

  let meshMap = {
    'sphereBasic': {
      program: 'main',
      geometry: BoxGeometry(200, 200, 200)
    }
  };

  ds.makePrograms(programMap);
  ds.makeMeshes(meshMap);

  this.update = delta => {
    ds.drawMesh('sphereBasic', {
      translate: [0, 0, 0],
      rotate: [0, 0, 0]
    });
  };
  
}
