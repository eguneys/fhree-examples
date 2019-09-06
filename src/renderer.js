import { programMap } from './shaders';
import { meshMap } from './meshes';
import Camera from './fhree/camera';
import Renderer from './fhree/renderer';

export default function makeRenderer(gl, aspect) {

  const camera = new Camera({ aspect });
  camera.pos[2] = 1000;

  const renderer = new Renderer(gl, camera);

  renderer.makePrograms(programMap);

  renderer.makeMeshes(meshMap);

  return { renderer, camera };  
}
