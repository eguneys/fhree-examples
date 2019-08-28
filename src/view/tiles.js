import Pool from '../pool';

import * as G from '../graphics';

import * as u from '../util';

import * as gu from '../gutil';
import * as cu from '../ctrl/util';

export default function view(ctrl, g, assets) {

  const { width, height, positions } = ctrl.data.game;


  const tileWidth = width * 0.05;
  const tileGap = 3;

  const tilesWidth = (tileWidth + tileGap) * cu.cols,
        tilesHeight = (tileWidth + tileGap) * cu.rows;


  const tilesX = ((width * 0.8) - tilesWidth) * 0.5,
        tilesY = (height - tilesHeight) * 0.5;

  let nextX = tilesX + tilesWidth + 20,
      nextY = tilesY + tilesHeight * 0.0;

  const letterScale = [tileWidth/10, -tileWidth/10],
        letterOffset = 16;

  const emptyPool = new Pool(id =>
    gu.makeQuad(g, {
      name: 'empty' + id,
      program: 'tile',
      uniforms: {
        uState: G.makeUniform1fSetter("uState")
      },
      width: tileWidth,
      height: tileWidth
    })
  );

  const letterPool = new Pool(id =>
    gu.makeTextDraw(g, assets['glyps'])
  );

  const letters = ['a', 'b', 'c', 'k'];

  const renderNext = (ctrl, shape, i) => {
    const y = i * tileWidth * 5;

    const tiles = [];

    let curDrag = ctrl.data.draggable.current,
        tileX = nextX,
        tileY = nextY + y;

    if (curDrag && curDrag.nextIndex == i) {
      tileX = curDrag.epos[0] - tileWidth * 2.0;
      tileY = curDrag.epos[1] - tileWidth * 1.0;
    }


    shape.tiles.forEach(tile => {
      const { pos, color, letter } = tile;
      const tX = tileX + pos[0] * (tileWidth + tileGap),
            tY = tileY + pos[1] * (tileWidth + tileGap);

      let empty = emptyPool.acquire();

      empty({
        translation: [tX, tY],
        width: tileWidth,
        height: tileWidth
      }, {
        uState: [u.TileStates.Empty]
      });

      let letterQ = letterPool.acquire();

      letterQ(letter, {
        translation: [tX + tileWidth * 0.4, tY + tileWidth * 0.4],
        scale: letterScale
      });

      tiles.push({
        tile,
        x: tX, 
        y: tY,
        width: tileWidth,
        height: tileWidth
      });
    });

    return { tiles };
  };

  const renderTiles = ctrl => {
    const tiles = {};
    const tileCtrl = ctrl.play.tiles;

    cu.allPos.forEach(pos => {
      let key = cu.pos2key(pos);
      let tile = tileCtrl.data.tiles[key];

      let empty = emptyPool.acquire();
      let tX = tilesX + pos[0] * (tileWidth + tileGap),
          tY = tilesY + pos[1] * (tileWidth + tileGap);

      let state = u.TileStates.Empty;

      let placeTiles = tileCtrl.data.placeTiles;

      if (placeTiles && placeTiles.some(_ => _.key === key)) {
        state = u.TileStates.Hilight;
      }

      empty({
        translation: [tX, tY]
      }, {
        uState: [state]
      });

      tiles[key] = {
        x: tX, 
        y: tY,
        width: tileWidth,
        height: tileWidth
      };

      if (tile && tile.letter) {

        let letter = letterPool.acquire();

        letter(tile.letter, {
          translation: [tX + letterOffset, tY + letterOffset],
          scale: letterScale
        });
      }
      
    });
    return tiles;
  };

  this.render = ctrl => {
    const tileCtrl = ctrl.play.tiles;

    const res = {
      next: []
    };

    res.tiles = renderTiles(ctrl);

    tileCtrl.data.next.forEach((next, i) => {
      res.next[i] = renderNext(ctrl, next, i);
    });

    return res;
  };

  this.release = () => {
    emptyPool.releaseAll();
    letterPool.releaseAll();
  };
  
}
