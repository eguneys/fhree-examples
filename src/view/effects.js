import * as u from '../util';

export default function view(ctrl, r) {

  const { width, height } = ctrl.data.game;

  this.render = ctrl => {
    const { tick } = ctrl.data;

    r.makeTransform('root', {
      translate: [0, 0, 0],
      rotate: [0.0,
               0.0, // u.usin(tick*0.01) * u.PI,
               0.0]
    });

    r.drawMesh('cubeUv', {
      transform: 'root',
      translate: [0.0, 0.0, 0.0]
    });

  };
}
