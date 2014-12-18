attribute vec3 inPosition;
attribute vec3 inNormal;
attribute vec2 inTexCoord;
 
uniform mat3 g_NormalMatrix;
 
uniform mat4 g_WorldViewProjectionMatrix;
uniform mat4 g_WorldMatrix;
uniform float g_Time;
uniform vec3 g_CameraPosition;
 
varying vec3 vNdotV;
varying vec2 vTexCoord;
 
varying vec4 vPosition;
varying vec3 vTransformedNormal;
varying vec3 vNormal;
 
void main(){
    vTexCoord = inTexCoord;
    vNormal = inNormal;
 
    vec3 rel = vec3(inPosition.x - 2.0, inPosition.y - 1.0, inPosition.z + 1.0);
 
    vec3 wave = vec3(1, 0, 0) * (abs(inPosition.x)) + 
        vec3(0, 1, 0) * (abs(inPosition.y)) + vec3(0, 0, 1) * (abs(inPosition.z));
    wave *=  vec3(0.125 * sin(g_Time / 3), 0.3 * sin(g_Time / 200), 0.125 * sin(g_Time / 400)) * (sin(g_Time) + 0.5);
    vec3 newPos = inNormal * wave; //* cos(length(rel) * g_Time) * 1.08;
    newPos = inPosition + newPos;
    gl_Position = g_WorldViewProjectionMatrix * vec4(newPos, 1.0);
 
    vec3 viewVec = normalize(vec4(g_CameraPosition, 1) - vec4(newPos, 1) * g_WorldMatrix).xyz;
 
    float fl = dot(inNormal, viewVec);
}