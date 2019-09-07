import * as u from './util';

import { BoxGeometry, SphereGeometry } from './geometry/main';

export default function meshMap(state, assets) {

  const { sphereRadius } = state;

  return {
    'sample': {
      program: 'main',
      geometry: BoxGeometry(200)
    },
    'sphereUv': {
      program: 'texture',
      material: assets['uvgrid'],
      geometry: SphereGeometry(sphereRadius, 32, 16)
    },
    'sphereBasic': {
      program: 'basic',
      geometry: SphereGeometry(sphereRadius, 32, 16)
    }
  };
};
