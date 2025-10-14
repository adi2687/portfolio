import { useEffect, useRef } from 'react';
import './PixelBlast.css';

const PixelBlastSimple = ({
  className,
  style,
  color = '#B19EEF',
  speed = 0.5
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a simple CSS-based pixel animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.8';
    
    container.appendChild(canvas);

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    let animationId;
    let time = 0;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const pixelSize = 4;
      const cols = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);
      
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const noise = Math.sin(x * 0.1 + time * speed) * Math.cos(y * 0.1 + time * speed);
          const alpha = Math.max(0, noise * 0.5 + 0.5);
          
          if (alpha > 0.2) {
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha * 0.8;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          }
        }
      }
      
      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, [color, speed]);

  return (
    <div
      ref={containerRef}
      className={`pixel-blast-container ${className ?? ''}`}
      style={style}
      aria-label="PixelBlast interactive background"
    />
  );
};

export default PixelBlastSimple;
