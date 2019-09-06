import defaults from './state';

import Assets from './assets';

import makeRenderer from './renderer';

import makeView from './view/main';
import makeCtrl from './ctrl/main';
import Loop from 'loopz';

import * as events from './events';

export function app(element, options) {

  const canvas = document.createElement('canvas'),
        gl = canvas.getContext('webgl2');
  element.append(canvas);
  const displayWidth = canvas.clientWidth,
        displayHeight = canvas.clientHeight;
  canvas.width = displayWidth;
  canvas.height = displayHeight;


  new Assets({
    'glyps': 'assets/font_10.png'
  }).start()
    .then(assets => {

      const state = {
        ...defaults(displayWidth, displayHeight),
        bounds: canvas.getBoundingClientRect()
      };

      let aspect = 1/state.game.ratio;
      let { camera, renderer } = makeRenderer(gl, aspect);

      let ctrl = new makeCtrl(state);
      let view = new makeView(ctrl, renderer, assets);

      new Loop(delta => {
        ctrl.update(delta);
        view.render(ctrl);
        renderer.render();
      }, 10).start();

      events.bindDocument(ctrl);


      if (module.hot) {
        module.hot.accept('./ctrl/main', function() {
          try {
            ctrl = new makeCtrl(state, graphics);
          } catch (e) {
            console.log(e);
          }
        });
        module.hot.accept
        (['./view/main'], function() 
         {
           try {
             view = new makeView(ctrl, graphics, assets);
           } catch (e) {
             console.log(e);
           }
         });
      }
    });
}
