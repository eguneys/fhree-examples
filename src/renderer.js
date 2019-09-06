import { programMap } from './shaders';
import { meshMap } from './meshes';
import Camera from './fhree/camera';
import Renderer from './fhree/renderer';

export default function makeRenderer(gl) {

  const camera = new Camera();
  camera.pos[2] = 400;

  const renderer = new Renderer(gl, camera);

  renderer.makePrograms(programMap);

  renderer.makeMeshes(meshMap);

  return { renderer, camera };  
}
