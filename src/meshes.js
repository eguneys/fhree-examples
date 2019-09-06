export const meshMap = {
  'sample': {
    program: 'main',
    geometry: BoxGeometry(200)
  }
};

function BoxGeometry(width = 1, height = width, depth = width) {
  

  let vertices = [],
      indices = [];

  let widthHalf = width / 2,
      heightHalf = height / 2,
      depthHalf = depth / 2;

  vertices.push(0, 0, 0);
  vertices.push(0, height, 0);
  vertices.push(width, height, 0);
  vertices.push(width, 0, 0);

  vertices.push(0, 0, depth);
  vertices.push(0, height, depth);
  vertices.push(width, height, depth);
  vertices.push(width, 0, depth);

  for (let i = 0; i < vertices.length; i+=3) {
    vertices[i] -= widthHalf;
    vertices[i+1] -= heightHalf;
    vertices[i+2] -= depthHalf;
  }

  indices.push(0, 1, 2);
  // indices.push(2, 3, 0);

  indices.push(4, 5, 6);
  

  return { vertices, 
           indices };
}
