// Animate the illustrated scenery in place; the original image remains the fallback.
export const vertexShader = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;
export const fragmentShader = `
precision mediump float;
uniform sampler2D artwork;
uniform vec2 resolution;
uniform vec2 viewport;
uniform vec2 origin;
uniform vec2 sceneSize;
uniform vec2 imageSize;
uniform float time;
uniform float wind;
uniform float cloudTime;

vec4 pixel(vec2 uv) {
  vec2 grid = imageSize / 1.5;
  return texture2D(artwork, (floor(uv * grid) + .5) / grid);
}
float openSky(vec2 uv) {
  return smoothstep(.12, .18, uv.y) * (1. - smoothstep(.455, .485, uv.y));
}
float cloudAlpha(vec4 color) {
  return smoothstep(.61, .91, color.r / max(color.b, .01)) * smoothstep(.63, .77, color.b) * smoothstep(.50, .70, color.g);
}
void main() {
  vec2 screen = vec2(gl_FragCoord.x / resolution.x, 1. - gl_FragCoord.y / resolution.y) * viewport;
  vec2 uv = (screen - origin) / sceneSize;
  if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) discard;
  vec4 original = pixel(uv);
  float green = smoothstep(.015, .10, original.g - original.r) * smoothstep(.015, .09, original.g - original.b);
  float canopy = (1. - smoothstep(.20, .43, uv.y)) * green;
  float grass = smoothstep(.69, .91, uv.y) * green;
  float breeze = 1. + wind * 2.;
  vec2 animated = uv;
  animated.x += canopy * sin(time * 1.45 + uv.y * 23. + uv.x * 12.) * .0020 * breeze;
  animated.y += canopy * cos(time * 1.1 + uv.x * 25.) * .0012 * breeze;
  animated.x += grass * (sin(time * 2.3 + uv.x * 27. + uv.y * 41.) * .0018 + sin(time * 1.5 + uv.x * 9.) * .0012) * breeze;
  animated.y += grass * sin(time * 1.7 + uv.x * 31.) * .0008;
  vec4 color = pixel(animated);

  // Separate the bright cloud pixels from their clear sky, then drift them.
  float skyPixel = smoothstep(.58, .72, original.b) * smoothstep(.84, .96, original.b / max(original.g, .01));
  float skyMask = openSky(uv) * skyPixel;
  vec3 sky = mix(vec3(.27, .57, .92), vec3(.50, .74, .96), smoothstep(.06, .49, uv.y));
  float oldCloud = cloudAlpha(original) * skyMask;
  color.rgb = mix(color.rgb, sky, oldCloud);
  vec2 cloudUV = vec2(fract(uv.x - cloudTime * .0035), uv.y);
  vec4 cloud = pixel(cloudUV);
  float movingCloud = cloudAlpha(cloud) * openSky(cloudUV) * skyMask;
  color.rgb = mix(color.rgb, cloud.rgb, movingCloud);
  gl_FragColor = color;
}
`;

export function createLivingScene(canvas, image) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
  if (!gl) return { supported: false, setGeometry() {}, setPaused() {}, gust() {} };
  function shader(type, source) {
    const result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(result));
    return result;
  }
  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const vertices = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(['resolution', 'viewport', 'origin', 'sceneSize', 'imageSize', 'time', 'wind', 'cloudTime'].map(name => [name, gl.getUniformLocation(program, name)]));
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  let ready = false, paused = true, frame, previous = 0, elapsed = 0, clouds = 0, gust = 0;
  let geometry, width, height;
  function draw(now = 0) {
    frame = undefined;
    if (!ready || !geometry || gl.isContextLost()) return;
    const delta = previous && !paused ? Math.min((now - previous) / 1000, .06) : 0;
    previous = now;
    elapsed += delta;
    clouds += delta * (1 + gust * 4);
    gust = Math.max(0, gust - delta * .28);
    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform1f(uniforms.cloudTime, clouds);
    gl.uniform1f(uniforms.wind, gust);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.dataset.frames = String(Number(canvas.dataset.frames || 0) + 1);
    if (!paused) frame = requestAnimationFrame(draw);
  }
  function upload() {
    if (!image.naturalWidth) return;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform2f(uniforms.imageSize, image.naturalWidth, image.naturalHeight);
    ready = true;
    canvas.dataset.renderer = 'webgl';
    if (frame === undefined) draw();
  }
  image.addEventListener('load', upload);
  if (image.complete) upload();
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    canvas.style.visibility = 'hidden';
  });
  return {
    supported: true,
    setGeometry(next, w, h) {
      geometry = next; width = w; height = h;
      canvas.width = Math.ceil(width / 1.5); canvas.height = Math.ceil(height / 1.5);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.viewport, width, height);
      gl.uniform2f(uniforms.origin, geometry.left, geometry.top);
      gl.uniform2f(uniforms.sceneSize, geometry.width, geometry.height);
      if (paused) draw();
    },
    setPaused(next) {
      paused = next;
      previous = 0;
      if (paused && frame !== undefined) { cancelAnimationFrame(frame); frame = undefined; }
      if (!paused && frame === undefined) frame = requestAnimationFrame(draw);
      canvas.dataset.motion = paused ? 'paused' : 'playing';
    },
    gust() { gust = 1; }
  };
}
