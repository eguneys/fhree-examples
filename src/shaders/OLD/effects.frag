#version 300 es

#include fcolors
#include fdefs

precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uState;

in vec2 vQuadCoord;

out vec4 outColor;

#include futil
#include feffects

float sdSphere(vec3 pos, float r) {
  return length(pos) - r;
}

float scene(vec3 pos) {
  float t = sdSphere(pos-vec3(0, 0, 8), 1.0);

  float t2 = sdSphere(pos-vec3(2, 0, 8), 1.0);

  t = min(t, t2);

  return t;
}

float castRay(vec3 ro, vec3 rd) {
  float tmax = 20.0;
  float t = 0.0;

  for (int i = 0; i < 64; i++) {
    float res = scene(ro + rd * t);

    if (res < (1.0)) {
      return t;
    } else if (res > tmax) {
      return -1.0;
    }
    
    t += res;
  }
  return -1.0;
}

vec3 render(vec3 ro, vec3 rd) {
  float t = castRay(ro, rd);
  vec3 col = vec3(1.0- t * 0.075);
  return col;
}

vec3 getCameraRayDir(vec2 uv, vec3 camPos, vec3 camTarget) {
  vec3 camForward = normalize(camTarget - camPos);
  vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camForward));
  vec3 camUp = normalize(cross(camForward, camRight));
  
  float fPersp = 2.0;
  vec3 vDir = normalize(uv.x * camRight + uv.y * camUp + camForward * fPersp);

  return vDir;
}

void main() {

  vec2 p = vQuadCoord;
  p.x *= uResolution.x/uResolution.y;

  vec3 camPos = vec3(0.0, 0.0, -1.0);
  vec3 at = vec3(0.0);

  vec3 rayDir = getCameraRayDir(p, camPos, at);

  vec4 col = colCrocTooth;

  col = vec4(render(camPos, rayDir), 1.0);

  outColor = col;
}
