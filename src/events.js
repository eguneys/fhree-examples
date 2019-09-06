import * as drag from './drag';

export function bindDocument(ctrl) {
  const unbinds = [];

  const onMouseDown = withEvent(ctrl, drag.start),
        onMouseUp = withEvent(ctrl, drag.cancel),
        onMouseMove = withEvent(ctrl, drag.move);

  unbinds.push(unbindable(document, 'mousedown', onMouseDown));
  unbinds.push(unbindable(document, 'mouseup', onMouseUp));
  unbinds.push(unbindable(document, 'mousemove', onMouseMove));

  return () => { unbinds.forEach(_ => _()); };

}

function unbindable(el, eventName, callback) {
  el.addEventListener(eventName, callback);
  return () => el.removeEventListener(eventName, callback);
}

function withEvent(ctrl, withDrag) {
  return function(e) {
    withDrag(ctrl, e);
  };
}
