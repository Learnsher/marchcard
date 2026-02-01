export const storage = {
  getCardData: () => {
    try {
      const data = localStorage.getItem('scratchCard');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  
  setCardData: (data: unknown) => {
    try {
      localStorage.setItem('scratchCard', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  clearCardData: () => {
    try {
      localStorage.removeItem('scratchCard');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

export const calculateScratchPercentage = (
  canvas: HTMLCanvasElement
): number => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return 0;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let transparentPixels = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 128) {
      transparentPixels++;
    }
  }

  return (transparentPixels / (pixels.length / 4)) * 100;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
