import { useRef, useEffect, useState, useCallback } from 'react';
import { calculateScratchPercentage } from '../utils';
import './ScratchCanvas.css';

interface ScratchCanvasProps {
  onReveal: () => void;
  revealThreshold?: number;
  isActive: boolean;
}

export const ScratchCanvas = ({
  onReveal,
  revealThreshold = 60,
  isActive,
}: ScratchCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Create scratch layer with rose gold gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(0.5, '#f5e6d3');
    gradient.addColorStop(1, '#d4af37');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add text hint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('刮開卡片', rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    if (isActive) {
      initCanvas();
    }
  }, [isActive, initCanvas]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !isActive || isRevealed) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(
        (x - rect.left) * scaleX,
        (y - rect.top) * scaleY,
        30 * window.devicePixelRatio,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Check scratch percentage
      const percentage = calculateScratchPercentage(canvas);
      if (percentage >= revealThreshold && !isRevealed) {
        setIsRevealed(true);
        onReveal();
      }
    },
    [isActive, isRevealed, revealThreshold, onReveal]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isActive) return;
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching || !isActive) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`scratch-canvas ${isActive ? 'active' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    />
  );
};
