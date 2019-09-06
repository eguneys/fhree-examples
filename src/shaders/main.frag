#version 300 es

precision mediump float;

#include fdefs

uniform float uTime;
uniform vec2 uResolution;

in vec2 vQuadCoord;

out vec4 outColor;

#include futil

void main() {

  vec4 col = vec4(1.0, 0.0, 0.0, 1.0);

  outColor = col;
}
