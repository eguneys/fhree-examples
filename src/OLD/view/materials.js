import * as u from '../util';

export default function view(ctrl, r) {

  const { width, height } = ctrl.data.game;

  const { stepSize } = ctrl.data;

  this.render = ctrl => {

    for (let alpha = 0; alpha <= 1.0; alpha += stepSize) {

      for (let beta = 0; beta <= 1.0; beta += stepSize) {

        for (let gamma = 0; gamma <= 1.0; gamma += stepSize) {

          let diffuseColor = 

          r.drawMesh('sphereBasic', {
            color: diffuseColor,
            translate: [alpha * 400 - 200, 
                        beta * 400 - 200,
                        gamma * 400 - 200]
          });
        }
      }
      
    }

  };
  
}
