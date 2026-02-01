import { useCountdown } from '../hooks';
import './CountdownTimer.css';

interface CountdownTimerProps {
  expiresAt: number | null;
  onExpire: () => void;
}

export const CountdownTimer = ({ expiresAt, onExpire }: CountdownTimerProps) => {
  const { formattedTime, isExpired } = useCountdown({ expiresAt, onExpire });

  if (!expiresAt) return null;

  return (
    <div className="countdown-timer">
      <div className="countdown-content">
        <span className="countdown-label">剩餘時間</span>
        <span className={`countdown-time ${isExpired ? 'expired' : ''}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
