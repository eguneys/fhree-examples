import Assets from './assets';

import makeCanvas from './canvas';
import makeExamples from './examples/main';

import Loop from 'loopz';

export function app(element, options) {

  new Assets({
    'uvgrid': 'assets/ash_uvgrid01.jpg'
  }).start()
    .then(assets => {

      const canvas = new makeCanvas(element);

      const state = {
        canvas
      };

      let examples = new makeExamples(state, canvas.gl);

      new Loop(delta => {
        examples.update(delta);
      }, 1).start();


      if (module.hot) {
        module.hot.accept
        (['./examples/main'], function() 
         {
           try {
             examples = new makeExamples(state);
           } catch (e) {
             console.log(e);
           }
         });
      }
    });
}
