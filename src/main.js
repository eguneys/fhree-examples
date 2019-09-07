import defaults from './state';

import Assets from './assets';

import { programMap } from './shaders';
import makeMeshes from './meshes';

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
    'uvgrid': 'assets/ash_uvgrid01.jpg'
  }).start()
    .then(assets => {

      const state = {
        ...defaults(displayWidth, displayHeight),
        bounds: canvas.getBoundingClientRect()
      };



      let meshMap = makeMeshes(assets);
      
      let aspect = 1/state.game.ratio;
      let { camera, renderer } = makeRenderer(gl, {
        programMap,
        meshMap,
        aspect
      });

      let ctrl = new makeCtrl(state, camera);
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
            ctrl = new makeCtrl(state, camera);
          } catch (e) {
            console.log(e);
          }
        });
        module.hot.accept
        (['./view/main'], function() 
         {
           try {
             view = new makeView(ctrl, renderer, assets);
           } catch (e) {
             console.log(e);
           }
         });
      }
    });
}
