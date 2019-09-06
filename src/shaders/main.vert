#version 300 es

precision mediump float;

in vec4 aPosition;

in vec2 aTexCoord;

out vec2 vQuadCoord;

uniform vec2 uResolution;

uniform mat4 uMatrix;

void main() {

  vec4 position = uMatrix * aPosition;

  vQuadCoord = aTexCoord;

  gl_Position = position;

}
