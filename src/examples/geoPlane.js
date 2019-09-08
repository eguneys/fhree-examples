import * as u from '../util';
import { programMap } from '../shaders';

import Camera from '../fhree/camera';
import { PlaneGeometry } from '../geometry';
import { BoxGeometry } from '../geometry';

export default function example(state, makeDrawState) {

  const { width, height, aspect } = state.canvas;

  let camera = new Camera({
    fov: u.rad(40),
    aspect
  });
  camera.pos = [0, 0, 400];

  let ds = this.drawState = makeDrawState(camera);

  let meshMap = {
    'planeQuad': {
      program: 'main',
      geometry: PlaneGeometry(width * 0.4, height * 0.4)
    }
  };

  ds.makePrograms(programMap);
  ds.makeMeshes(meshMap);

  this.update = delta => {
    ds.drawMesh('planeQuad', {}, {
    });
  };
  
}
