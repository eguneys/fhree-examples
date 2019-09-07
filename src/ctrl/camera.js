import * as u from '../util';

export default function camera(ctrl, camera) {

  const { width, height } = ctrl.data.game;

  this.init = delta => {
    camera.pos = [0.0, 0.0, 100];
  };

  let theta = 0;

  this.update = delta => {
    theta += delta * 0.01;

    theta %= u.TAU;

    camera.pos[0] = Math.cos(theta) * 700.0;
    camera.pos[2] = Math.sin(theta) * 700.0;
  };

}
