#version 300 es

precision mediump float;

#include fdefs

uniform vec3 uDiffuse;


in vec2 vQuadCoord;

out vec4 outColor;

#include futil

void main() {

  vec4 diffuse = vec4(uDiffuse, 1.0);

  outColor = diffuse;
}
