import { r as reactExports } from "./react.mjs";
import { u as useFrame } from "./react-three__fiber.mjs";
import { R as REVISION, M as MathUtils, b as Color, a as AdditiveBlending, m as Vector3, k as Spherical, j as ShaderMaterial } from "./three.mjs";
const getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
const version = /* @__PURE__ */ getVersion();
const Float = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  enabled = true,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = [-0.1, 0.1],
  autoInvalidate = false,
  ...props
}, forwardRef) => {
  const ref = reactExports.useRef(null);
  reactExports.useImperativeHandle(forwardRef, () => ref.current, []);
  const offset = reactExports.useRef(Math.random() * 1e4);
  useFrame((state) => {
    var _floatingRange$, _floatingRange$2;
    if (!enabled || speed === 0) return;
    if (autoInvalidate) state.invalidate();
    const t = offset.current + state.clock.elapsedTime;
    ref.current.rotation.x = Math.cos(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.y = Math.sin(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.z = Math.sin(t / 4 * speed) / 20 * rotationIntensity;
    let yPosition = Math.sin(t / 4 * speed) / 10;
    yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, (_floatingRange$ = floatingRange == null ? void 0 : floatingRange[0]) !== null && _floatingRange$ !== void 0 ? _floatingRange$ : -0.1, (_floatingRange$2 = floatingRange == null ? void 0 : floatingRange[1]) !== null && _floatingRange$2 !== void 0 ? _floatingRange$2 : 0.1);
    ref.current.position.y = yPosition * floatIntensity;
    ref.current.updateMatrix();
  });
  return /* @__PURE__ */ reactExports.createElement("group", props, /* @__PURE__ */ reactExports.createElement("group", {
    ref,
    matrixAutoUpdate: false
  }, children));
});
class StarfieldMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: {
          value: 0
        },
        fade: {
          value: 1
        }
      },
      vertexShader: (
        /* glsl */
        `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`
      ),
      fragmentShader: (
        /* glsl */
        `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      }`
      )
    });
  }
}
const genStar = (r) => {
  return new Vector3().setFromSpherical(new Spherical(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
};
const Stars = /* @__PURE__ */ reactExports.forwardRef(({
  radius = 100,
  depth = 50,
  count = 5e3,
  saturation = 0,
  factor = 4,
  fade = false,
  speed = 1
}, ref) => {
  const material = reactExports.useRef(null);
  const [position, color, size] = reactExports.useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = Array.from({
      length: count
    }, () => (0.5 + 0.5 * Math.random()) * factor);
    const color2 = new Color();
    let r = radius + depth;
    const increment = depth / count;
    for (let i = 0; i < count; i++) {
      r -= increment * Math.random();
      positions.push(...genStar(r).toArray());
      color2.setHSL(i / count, saturation, 0.9);
      colors.push(color2.r, color2.g, color2.b);
    }
    return [new Float32Array(positions), new Float32Array(colors), new Float32Array(sizes)];
  }, [count, depth, factor, radius, saturation]);
  useFrame((state) => material.current && (material.current.uniforms.time.value = state.clock.elapsedTime * speed));
  const [starfieldMaterial] = reactExports.useState(() => new StarfieldMaterial());
  return /* @__PURE__ */ reactExports.createElement("points", {
    ref
  }, /* @__PURE__ */ reactExports.createElement("bufferGeometry", null, /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [position, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [color, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [size, 1]
  })), /* @__PURE__ */ reactExports.createElement("primitive", {
    ref: material,
    object: starfieldMaterial,
    attach: "material",
    blending: AdditiveBlending,
    "uniforms-fade-value": fade,
    depthWrite: false,
    transparent: true,
    vertexColors: true
  }));
});
export {
  Float as F,
  Stars as S
};
