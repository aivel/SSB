varying vec3 vNdotV;
varying vec2 vTexCoord;
varying vec3 vNormal;
 
varying vec4 vPosition;
varying vec3 vTransformedNormal;
uniform sampler2D m_ColorMap;
uniform samplerCube m_SkyBox;
 
#ifdef SPECULARCOLOR
    uniform vec4 m_SpecularColor;
    uniform float m_Shininess;
#endif
 
void main() {
    vec4 specularLightWeighting = vec4(0, 0, 0, 0);

    #ifdef SPECULARCOLOR
        vec3 eyeDirection = normalize(-vPosition.xyz);
        vec3 reflectionDirection = reflect(-1 * vec3(0, 0, 1), normalize(vTransformedNormal));
        float specLightWeighting = pow( max( dot(reflectionDirection, eyeDirection), 0.0), m_Shininess);
        vec4 specColor = m_SpecularColor;
    #ifdef USESPECULARNORMAL
        specColor = vec4(vNormal, m_SpecularColor.a);
    #endif
        specularLightWeighting = specColor * specLightWeighting;
    #endif
 
    vec4 modulatedColor;
    vec4 soapRefColor = texture2D(m_ColorMap, vTexCoord);
    vec4 groundColor = vec4(0.5, 0.5, 0.5, 0);
 
    modulatedColor.rgb = vec3(clamp(2 * soapRefColor.x * groundColor.x, 0.3, 1),
                              clamp(2 * soapRefColor.y * groundColor.y, 0.4, 1),
                              clamp(2 * soapRefColor.z * groundColor.z, 0.4, 1));
    modulatedColor.a = (1 - vNdotV.x) * 0.5 - 0.01;
    float opacity = clamp(4 * (groundColor.a * groundColor.a - 0.75), 0.2, 1);

    vec3 vReflected = reflect(-vNormal, vTransformedNormal);
 
    gl_FragColor.rgba = mix(modulatedColor, groundColor, opacity) + specularLightWeighting.rgb;
    gl_FragColor.a = modulatedColor.a + opacity;
    gl_FragColor.a /= 2;
    gl_FragColor.a += specularLightWeighting.a;

    vec4 textureColor = textureCube(m_SkyBox, vReflected);
    float sr = (textureColor.r + textureColor.g + textureColor.b)/3;
    gl_FragColor += vec4(sr, sr, sr, 0.1);
}