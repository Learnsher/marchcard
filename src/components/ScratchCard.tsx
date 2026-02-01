import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { Card3D } from './Card3D';
import { ScratchCanvas } from './ScratchCanvas';
import { CountdownTimer } from './CountdownTimer';
import { AudioToggle } from './AudioToggle';
import { apiService } from '../services/api';
import { storage } from '../utils';
import './ScratchCard.css';

type CardStatus = 'idle' | 'ready' | 'scratching' | 'revealed' | 'expired';

export const ScratchCard = () => {
  const [status, setStatus] = useState<CardStatus>('idle');
  const [cardId, setCardId] = useState<string | null>(null);
  const [prize, setPrize] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prizeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Load saved data on mount
  useEffect(() => {
    const savedData = storage.getCardData();
    if (savedData && savedData.expiresAt > Date.now()) {
      setCardId(savedData.cardId);
      setExpiresAt(savedData.expiresAt);
      if (savedData.prize) {
        setPrize(savedData.prize);
        setStatus('revealed');
      } else {
        setStatus('ready');
      }
    }
  }, []);

  // Entry animation
  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.from(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  // Scratch hint animation
  useEffect(() => {
    if (status === 'ready' && cardRef.current) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.to(cardRef.current, {
        scale: 1.02,
        duration: 0.6,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      });
    }
  }, [status]);

  // CTA pulse animation
  useEffect(() => {
    if (status === 'revealed' && ctaRef.current && prize) {
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, [status, prize]);

  const handleStart = async () => {
    setIsLoading(true);
    const response = await apiService.start();
    
    if (response.success && response.data) {
      setCardId(response.data.cardId);
      setExpiresAt(response.data.expiresAt);
      setStatus('ready');
      storage.setCardData({
        cardId: response.data.cardId,
        expiresAt: response.data.expiresAt,
      });
    }
    setIsLoading(false);
  };

  const handleReveal = async () => {
    if (!cardId) return;

    setStatus('scratching');
    const response = await apiService.reveal(cardId);
    
    if (response.success && response.data) {
      setPrize(response.data.prize);
      setExpiresAt(response.data.expiresAt);
      setStatus('revealed');
      
      storage.setCardData({
        cardId,
        prize: response.data.prize,
        expiresAt: response.data.expiresAt,
      });

      // Reveal animation
      if (prizeRef.current) {
        gsap.fromTo(
          prizeRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
        );
      }
    }
  };

  const handleRedeem = async () => {
    if (!cardId || status === 'expired') return;

    setIsLoading(true);
    const response = await apiService.redeem(cardId);
    
    if (response.success) {
      alert(response.data?.message || '兌換成功！');
      storage.clearCardData();
      setStatus('idle');
      setCardId(null);
      setPrize(null);
      setExpiresAt(null);
    }
    setIsLoading(false);
  };

  const handleExpire = () => {
    setIsExpired(true);
    if (ctaRef.current) {
      gsap.killTweensOf(ctaRef.current);
    }
  };

  return (
    <>
      <AudioToggle />
      {expiresAt && <CountdownTimer expiresAt={expiresAt} onExpire={handleExpire} />}
      
      <div ref={containerRef} className="scratch-card-container">
        <div ref={cardRef} className="card-wrapper">
          <div className="card-3d">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Card3D isRevealed={status === 'revealed'} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>

          {status === 'ready' && (
            <ScratchCanvas onReveal={handleReveal} isActive={true} />
          )}

          {status === 'revealed' && prize && (
            <div ref={prizeRef} className="prize-overlay">
              <div className="prize-content">
                <h2 className="prize-title">恭喜中獎！</h2>
                <p className="prize-text">{prize}</p>
              </div>
            </div>
          )}
        </div>

        <div className="action-section">
          {status === 'idle' && (
            <button
              className="btn btn-primary"
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading ? '載入中...' : '開始抽獎'}
            </button>
          )}

          {status === 'revealed' && (
            <button
              ref={ctaRef}
              className={`btn btn-primary ${isExpired ? 'disabled' : ''}`}
              onClick={handleRedeem}
              disabled={isLoading || isExpired}
            >
              {isExpired ? '已失效' : isLoading ? '處理中...' : '立即兌換'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
