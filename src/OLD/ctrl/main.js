import * as u from '../util';

import cameraController from './camera';

export default function ctrl(state, camera) {
  const defaults = () => ({
    tick: 0,
    draggable: {}
  });

  this.data = { ...defaults(), ...state };

  this.cameraController = new cameraController(this, camera);

  this.cameraController.init({});

  this.spaceHit = () => {

  };

  this.spaceRelease = () => {

  };

  this.update = delta => {
    this.data.tick += delta;

    this.cameraController.update(delta);
  };
}
