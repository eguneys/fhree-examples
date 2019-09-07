import * as u from './util';

const left = [[-1, 0],
              [-2, 0], 
              [-3, 0]],
      right = [[1, 0],
               [2, 0],
               [3, 0]],
      up = [[0, -1],
            [0, -2],
            [0, -3]],
      down = [[0, 1],
              [0, 2],
              [0, 3]],
      upleft = [[-1, -1],
                [-2, -2],
                [-3, -3]],
      upright = [[1, -1],
                 [2, -2],
                 [3, -3]],
      downleft = [[-1, 1],
                  [-2, 2],
                  [-3, 3]],
      downright = [[1, 1],
                   [2, 2],
                   [3, 3]];

const allVectors = [
  left, right, up, down, upleft, upright, downleft, downright
];      


function diffKey(fromKey, d) {
  const fromPos = u.key2pos(fromKey);

  const toPos = [fromPos[0] + d[0],
                 fromPos[1] + d[1]];

  if (toPos[0] < 0 || toPos[0] > u.cols ||
      toPos[1] < 0 || toPos[1] > u.rows) {
    return null;
  }

  return u.pos2key(toPos);
}

export const movementVector = (from) => {
  return allVectors.map(dirVector => 
    dirVector.map(_ => diffKey(from, _))
      .filter(_ =>  !!_))
    .filter(_ => _.length === 3);
};
