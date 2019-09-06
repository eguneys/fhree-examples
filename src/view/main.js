import * as u from '../util';

import effectsView from './effects';

export default function view(ctrl, g, assets) {

  const { width, height } = ctrl.data;

  const effects = new effectsView(ctrl, g);

  this.render = ctrl => {
    let views;

    effects.render(ctrl);

    return views;
  };

}
