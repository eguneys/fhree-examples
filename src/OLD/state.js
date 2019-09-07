import * as u from './util';
import * as cu from './ctrl/util';

export default function defaults(width, height) {

  const ratio = height / width;

  const game = {
    state: u.States.Over,
    highscore: 0,
    width,
    height,
    ratio
  };

  return {
    game,
  };
 
}
