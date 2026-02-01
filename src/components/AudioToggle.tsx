import { useSoundToggle } from '../hooks';
import './AudioToggle.css';

export const AudioToggle = () => {
  const { soundEnabled, toggleSound } = useSoundToggle();

  return (
    <button
      className="audio-toggle"
      onClick={toggleSound}
      aria-label={soundEnabled ? '關閉聲音' : '開啟聲音'}
      title={soundEnabled ? '關閉聲音' : '開啟聲音'}
    >
      {soundEnabled ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
        </svg>
      )}
    </button>
  );
};
