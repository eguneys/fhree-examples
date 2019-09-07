import Camera from './fhree/camera';
import Renderer from './fhree/renderer';

export default function makeRenderer(state) {

  const { width, height, gl } = state.canvas;

  const renderer = new Renderer(gl);

  this.render = () => {

    renderer.render();

  };

}
