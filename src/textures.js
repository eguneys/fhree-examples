const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'].map(_ => _.toUpperCase());

export default function textures() {

  const tss = {};

  tss['scoreLabel'] = labelTexture('SCORE');

  tss['letters'] = letters.map(labelTexture);
  
  return tss;
};

const labelTexture = (label) => {
  return withCanvasTexture(label.length * 100 * 0.5, 100, (w, h,  ctx, canvas) => {


    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, w, h);
    ctx.font = 'bold 50pt Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, w / 2, 50);
    
    return canvas;
  });
};

function withCanvasTexture(width, height, f) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  f(width, height, canvas.getContext('2d'), canvas);
  const texture = canvas;
  // document.body.append(canvas);
  return texture;
}
