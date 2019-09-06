import m4 from './matrix';

export default function MatrixStack() {

  this.translate = (x, y, z) => 
  apply(_ => m4.translate(_, x, y, z));

  this.rotateZ = (angle) =>
  apply(_ => m4.zRotate(_, angle));

  this.scale = (x, y, z) =>
  apply(_ => m4.scale(_, x, y, z));

  this.restore = () => {
    if (stack.length === 1) {
      return;
    }

    stack.pop();
  };

  this.save = () => {
    stack.push(stack[stack.length - 1].slice());
  };

  const stack = [m4.identity()];
  const apply = (f) => {
    stack[stack.length - 1] = f(stack[stack.length - 1].slice());
  };
}
