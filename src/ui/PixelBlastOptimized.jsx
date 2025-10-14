import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PixelBlast.css';

const PixelBlastOptimized = ({
  variant = 'square',
  pixelSize = 3,
  color = '#B19EEF',
  className,
  style,
  patternScale = 2,
  patternDensity = 1,
  pixelSizeJitter = 0,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  autoPauseOffscreen = true
}) => {
  const containerRef = useRef(null);
  const threeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simplified shader for better performance
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      
      uniform vec3 uColor;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform float uPixelSize;
      uniform float uScale;
      uniform float uDensity;
      uniform float uPixelJitter;
      uniform float uEdgeFade;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        float aspectRatio = uResolution.x / uResolution.y;
        
        vec2 pixelId = floor(fragCoord / uPixelSize);
        vec2 pixelUV = fract(fragCoord / uPixelSize);
        
        vec2 uv = pixelId / uResolution * vec2(aspectRatio, 1.0) * uScale;
        
        float n = noise(uv + uTime * 0.1);
        float density = step(0.5, n + (uDensity - 0.5) * 0.3);
        
        float jitter = 1.0 + (hash(pixelId) - 0.5) * uPixelJitter;
        float coverage = density * jitter;
        
        if (uEdgeFade > 0.0) {
          vec2 norm = fragCoord / uResolution;
          float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
          float fade = smoothstep(0.0, uEdgeFade, edge);
          coverage *= fade;
        }
        
        gl_FragColor = vec4(uColor, coverage);
      }
    `;

    const canvas = document.createElement('canvas');
    
    // Try WebGL 2 first, then fallback to WebGL 1
    let gl = canvas.getContext('webgl2', { alpha: true, antialias: false });
    if (!gl) {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    }
    
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      alpha: true,
      antialias: false
    });

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEdgeFade: { value: edgeFade }
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let raf = 0;

    const setSize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };

    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    const animate = () => {
      if (autoPauseOffscreen && !container.offsetParent) {
        raf = requestAnimationFrame(animate);
        return;
      }

      uniforms.uTime.value = clock.getElapsedTime() * speed;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    threeRef.current = {
      renderer,
      scene,
      camera,
      material,
      clock,
      uniforms,
      resizeObserver,
      raf,
      mesh
    };

    return () => {
      if (threeRef.current) {
        const t = threeRef.current;
        t.resizeObserver?.disconnect();
        cancelAnimationFrame(t.raf);
        t.mesh?.geometry.dispose();
        t.material.dispose();
        t.renderer.dispose();
        if (t.renderer.domElement.parentElement === container) {
          container.removeChild(t.renderer.domElement);
        }
        threeRef.current = null;
      }
    };
  }, [pixelSize, patternScale, patternDensity, pixelSizeJitter, speed, edgeFade, transparent, color, autoPauseOffscreen]);

  return (
    <div
      ref={containerRef}
      className={`pixel-blast-container ${className ?? ''}`}
      style={style}
      aria-label="PixelBlast interactive background"
    />
  );
};

export default PixelBlastOptimized;
