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
                 geometry,
                 material }) => 
     new Pool(id => {
       
       let program = prCache[programName];
       if (!program) {
         throw new Error("Undefined program name " + programName);
       }

       if (!geometry) {
         console.warn("Undefined geometry for mesh " + name);
       }


       const uTextureInfo = 
             new G.makeTextureInfoForUniform("uTexture");

       const aPosInfo = new G.makeBufferInfoForAttribute
       ("aPosition", { size: 3 });

       const aTexCoordInfo = new G.makeBufferInfoForAttribute
       ("aTexCoord", { size: 3 });


       const mesh = g.makeDraw({
         name,
         program,
         uniforms: {
           "uMatrix": G.makeUniform4fvSetter("uMatrix"),
           "uColor": G.makeUniform1fSetter("uColor")
         },
         textureInfos: [
           uTextureInfo
         ],
         bufferInfos: [
           aPosInfo,
           aTexCoordInfo
         ],
         indices: geometry.indices
       });

       // uTextureInfo.set(material);

       aPosInfo.set(geometry.vertices, g.gl.STATIC_DRAW);
       aTexCoordInfo.set(geometry.uvs, g.gl.STATIC_DRAW);
       
       return mesh;
     })
    );
  };

  this.makeTransform = (name, transform) => {

    transforms[name] = modelMatrix(transform);

  };

  const modelMatrix = transform => {
    let matrix = transforms[transform.transform] || mat4.identity();

    return mat4.transform(matrix, transform);
  };


  const mvpMatrix = modelMatrix => {
    const { pos: camPos, target, up } = camera;
    const { fov, aspect, near, far } = camera;

    let camMatrix = mat4.lookAt(camPos, target, up);
    let viewMatrix = mat4.inverse(camMatrix);
    
    let projectionMatrix = mat4.perspective(fov, aspect, near, far);

    let viewProjectionMatrix = mat4.multiply(projectionMatrix, viewMatrix);

    return mat4.multiply(viewProjectionMatrix, modelMatrix);
  };

  this.drawMesh = (name, transform) => {

    const uMatrix = mvpMatrix(modelMatrix(transform));

    let drawInfoPool = drawInfos[name];

    if (!drawInfoPool) {
      throw new Error("undefined mesh " + name);
    }

    let drawInfo = drawInfoPool.acquire();

    let uniforms = {
      uMatrix: [uMatrix]
    };

    g.addDrawInfo(drawInfo, uniforms, drawInfo.numElements);
  };

  this.render = () => {
    g.render();
    release();
  };

  const release = () => {
    objForeach(drawInfos, (_, pool) => pool.releaseAll());
  };

}
