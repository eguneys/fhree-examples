import * as u from '../util';

export default function SphereGeometry(radius = 1, 
                                       widthSegments = 8,
                                       heightSegments = 6,
                                       phiStart = 0,
                                       phiLength = u.TAU,
                                       thetaStart = 0,
                                       thetaLength = u.PI) {
  
  let vertices = [],
      uvs = [],
      indices = [];


  let thetaEnd = Math.min(thetaStart + thetaLength, u.PI);


  let index = 0,
      grid = [];

  for (let iy = 0; iy <= heightSegments; iy++) {
    let verticesRow = [];

    let v = iy / heightSegments;

    let uOffset = 0;

    if (iy === 0 && thetaStart === 0) {
      uOffset = 0.5 / widthSegments;
    } else if (iy === heightSegments && thetaEnd === u.PI) {
      uOffset = - 0.5 / widthSegments;
    }
    

    for (let ix = 0; ix <= widthSegments; ix++) {
      
      let u = ix / widthSegments;

      let vertex = [
        - radius * Math.cos(phiStart + u * phiLength) * 
          Math.sin(thetaStart + v * thetaLength),
        radius * Math.cos(thetaStart + v * thetaLength),
        radius * Math.sin(phiStart + u * phiLength) * 
          Math.sin(thetaStart + v * thetaLength)];

      vertices.push(vertex[0],
                    vertex[1],
                    vertex[2]);

      uvs.push(u + uOffset, 1 - v);

      verticesRow.push(index++);
    }

    grid.push(verticesRow);
  }


  for (let iy = 0; iy < heightSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      let a = grid[iy][ix+1],
          b = grid[iy][ix],
          c = grid[iy+1][ix],
          d = grid[iy+1][ix+1];

      if (iy !== 0 || thetaStart > 0) 
        indices.push(a, b, d);
      if (iy !== heightSegments - 1 || thetaEnd < u.PI)
        indices.push(b, c, d);      
    }
  }


  return { vertices,
           uvs,
           indices };
}
