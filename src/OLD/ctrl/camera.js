import * as u from '../util';

export default function camera(ctrl, camera) {

  const { width, height } = ctrl.data.game;

  this.init = delta => {
    camera.fov = 50.8;
    camera.pos = [0.0, 400.0, 400 * 3.5];
  };

  let theta = 0;

  this.update = delta => {

    theta += delta * 0.01 * 0.001;

    //camera.fov = u.usin(theta) * 100;
    //console.log(camera.fov);

    // theta %= u.TAU;

    // camera.pos[0] = Math.cos(theta) * 200.0;
    // camera.pos[2] = Math.sin(theta) * 200.0;
  };

}
