import { objMap, objForeach } from '../util2';
import * as u from '../util';

import Graphics from './graphics';
import * as G from './graphics';

import * as mat4 from './matrix';

import Pool from '../pool';

export default function Renderer(gl, camera) {

  let g = new Graphics(gl);

  let drawInfos = {};
  let prCache = {};

  let transforms = {};

  this.makePrograms = (prs) => {
    
    Object.keys(prs).forEach(key => {
      let { vSource, fSource } = prs[key];

      prCache[key] = G.makeProgram(g.gl, vSource, fSource);
    });

  };

  this.makeMeshes = (mess) => {
    drawInfos = objMap
    (mess, (_, { name = _, 
                 program: programName,
                 geometry }) => 
     new Pool(id => {
       
       let program = prCache[programName];
       if (!program) {
         throw new Error("Undefined program name " + programName);
       }

       if (!geometry) {
         console.warn("Undefined geometry for mesh " + name);
       }

       const aPosInfo = new G.makeBufferInfoForAttribute
       ("aPosition", { target: g.gl.ARRAY_BUFFER,
                       size: 3 });


       const mesh = g.makeDraw({
         name,
         program,
         uniforms: {
           "uMatrix": G.makeUniform4fvSetter("uMatrix")
         },
         bufferInfos: [
           aPosInfo
         ],
         indices: geometry.indices
       });

       aPosInfo.set(geometry.vertices, g.gl.STATIC_DRAW);
       
       return mesh;
     })
    );
  };

  this.makeTransform = (name, transform) => {

    transforms[name] = getTransform(transform);

  };

  const getTransform = transform => {

    const { pos: camPos, target, up } = camera;
    const { fov, aspect, near, far } = camera;

    let camMatrix = mat4.lookAt(camPos, target, up);
    let viewMatrix = mat4.inverse(camMatrix);
    
    let projectionMatrix = mat4.perspective(fov, aspect, near, far);

    let viewProjectionMatrix = mat4.multiply(projectionMatrix, viewMatrix);

    return mat4.transform(viewProjectionMatrix, transform);
  };


  this.drawMesh = (name, transform) => {

    transform = getTransform(transform);
    let drawInfoPool = drawInfos[name];

    if (!drawInfoPool) {
      throw new Error("undefined mesh " + name);
    }

    let uniforms = {
      uMatrix: [transform]
    };

    g.addDrawInfo(drawInfoPool.acquire(), uniforms, 6);
  };

  this.render = () => {
    g.render();
    release();
  };

  const release = () => {
    objForeach(drawInfos, (_, pool) => pool.releaseAll());
  };

}
