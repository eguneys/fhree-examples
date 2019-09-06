import * as u from '../util';

export default function view(ctrl, r) {

  const { width, height } = ctrl.data.game;

  this.render = ctrl => {

    r.makeTransform('root', {
      translate: [0, 0, 0]
    });

    r.drawMesh('sample', {
      transform: 'root',
      translate: [0.1, 0.1, 2.0],
      rotate: [0.0, 0.0, 1.0]
    });

  };
}
