import * as u from '../util';

import effectsView from './effects';
import materialsView from './materials';

export default function view(ctrl, r, assets) {

  const { width, height } = ctrl.data;

  const materials = new materialsView(ctrl, r);

  this.render = ctrl => {

    materials.render(ctrl);

  };

}
