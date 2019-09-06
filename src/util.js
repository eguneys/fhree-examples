export const States = {
  Over: 'over',
  Play: 'play'
};

// see ./shaders/empty.frag
export const TileStates = {
  Empty: 0,
  Hilight: 1
};

export const PI = Math.PI;
export const HALFPI = PI / 2;
export const THIRDPI = PI / 3;
export const TAU = PI * 2;
export const THIRDTAU = TAU / 3;

export function rad(degree) {
  return degree * Math.PI / 180;
}

export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function randInt(min, max) {
  return Math.floor(rand(min, max));
}

export function clamp(min, max, v) {
  return Math.min(Math.max(v, min), max);
}

export function usin(v) {
  return (Math.sin(v) + 1.0) / 2.0;
}

export function smoothstep (min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
};

export function round(v, d = 100) {
  return Math.round(v * d) / d;
}

export function now() {
  return Date.now();
}

export const ensureDelay = (start, fn, delay = 1000) => {
  if (now() - start > delay) {
    fn();
  }
};

export const withDelay = (fn, delay, updateFn) => {
  let lastUpdate = 0;

  return (delta) => {
    lastUpdate += delta;
    if (lastUpdate >= delay) {
      fn();
      lastUpdate = 0;
    } else {
      if (updateFn)
        updateFn(lastUpdate / delay);
    }
  };
};

export const withRandomDelay = (fn, delayFn, updateFn) => {
  let lastUpdate = 0;

  return (delta) => {
    let delay = delayFn(delta);
    lastUpdate += delta;
    if (lastUpdate >= delay) {
      fn();
      lastUpdate = 0;
    } else {
      if (updateFn)
        updateFn(lastUpdate / delay);
    }
  };
};

export function eventPosition(e) {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
  if (e.touches && e.targetTouches[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return undefined;
}
