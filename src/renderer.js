import Camera from './fhree/camera';
import Renderer from './fhree/renderer';

export default function makeRenderer(gl, {
  meshMap,
  programMap,
  aspect
}) {

  const camera = new Camera({ aspect });

  const renderer = new Renderer(gl, camera);

  renderer.makePrograms(programMap);

  renderer.makeMeshes(meshMap);

  return { renderer, camera };  
}
