import React, { useEffect, useState } from 'react';
import { GameResult } from '../App';

interface Scene4Props {
  result: GameResult | null;
  onNext: () => void;
  onReset: () => void;
}

const Scene4: React.FC<Scene4Props> = ({ result, onNext, onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPlanes, setShowPlanes] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (result) {
      if (result.isWin) {
        // 당첨 시 축하 효과들
        setShowConfetti(true);
        setShowFireworks(true);
        setShowHearts(true);
        
        // 축하 사운드 재생
        const audio = new Audio(`${process.env.PUBLIC_URL}/ddd.wav`);
        audio.volume = 0.7;
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // 축하 효과들 시간차 제거
        setTimeout(() => {
          setShowConfetti(false);
          setShowFireworks(false);
          setShowHearts(false);
        }, 5000);
      } else {
        // 꽝일 때 비행기 효과
        setShowPlanes(true);
        
        // 비행기 소리 (Web Audio API로 생성)
        const playPlaneSound = () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 2);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 4);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 5);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 5);
        };
        
        playPlaneSound();
        
        // 비행기 효과 5초 후 제거
        setTimeout(() => setShowPlanes(false), 5000);
      }
    }
  }, [result]);

  if (!result) return null;

  return (
    <div className="scene" style={{ 
      background: result.isWin
        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      minHeight: '100vh'
    }}>
      <div className="result-container" style={{
        animation: 'fadeInUp 1s ease-out'
      }}>
        {/* 선택한 카드 표시 */}
        <div className="selected-card-info" style={{
          marginBottom: '2rem',
          animation: 'cardReveal 0.8s ease-out'
        }}>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            선택한 카드
          </h3>
          <div className="result-card">
            <img 
              src={result.selectedCard.imagePath} 
              alt={`${result.selectedCard.suit} ${result.selectedCard.value}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'flex';
                }
              }}
            />
            <div 
              style={{
                display: 'none',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px'
              }}
            >
              {result.selectedCard.value === 'JOKER' ? '🃏' : result.selectedCard.value}
            </div>
          </div>
        </div>

        <div className="result-emoji">
          {result.isWin ? '🎉' : '✈️'}
        </div>
        
        <h1 className={`scene-title ${result.isWin ? 'win-result' : 'lose-result'}`}>
          {result.isWin ? (
            <>
              축하합니다!
              <br />
              <span className="prize-name">{result.prize}</span>
              <br />
              당첨!
              <br />
              <span style={{ fontSize: '0.7em', marginTop: '0.5rem', display: 'block' }}>
                쿠폰을 받으세요!
              </span>
            </>
          ) : (
            <>
              아쉽지만,
              <br />
              <span className="miss-text">꽝!</span>
            </>
          )}
        </h1>
        
        <div style={{ marginTop: '2rem' }}>
          {result.isWin ? (
            <button className="btn" onClick={onNext}>
              쿠폰 받기
            </button>
          ) : (
            <button className="btn-secondary btn" onClick={onReset}>
              처음으로
            </button>
          )}
        </div>
        
        {!result.isWin && (
          <p className="description" style={{ marginTop: '1rem' }}>
            내일 또 도전해보세요~
          </p>
        )}
      </div>

      {/* 축하 효과 1: 컨페티 (100개로 증가) */}
      {showConfetti && (
        <div className="confetti">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f1c40f', '#e74c3c', '#9b59b6', '#2ecc71', '#e67e22'][i % 8]
              }}
            />
          ))}
        </div>
      )}

      {/* 축하 효과 2: 폭죽 */}
      {showFireworks && (
        <div className="fireworks">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: '2rem'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* 축하 효과 3: 하트 */}
      {showHearts && (
        <div className="hearts">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${1 + Math.random()}rem`,
                color: ['#ff69b4', '#ff1493', '#dc143c', '#ff6347'][i % 4]
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* 비행기 효과 (강화된 버전) */}
      {showPlanes && (
        <div className="planes">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="plane"
              style={{
                position: 'absolute',
                fontSize: '3rem',
                animationDelay: `${i * 0.6}s`,
                top: `${10 + i * 10}%`,
                zIndex: 10
              }}
            >
              ✈️
            </div>
          ))}
          {/* 구름 효과 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`cloud-${i}`}
              className="cloud"
              style={{
                position: 'absolute',
                fontSize: '2rem',
                animationDelay: `${Math.random() * 3}s`,
                top: `${Math.random() * 100}%`,
                opacity: 0.6
              }}
            >
              ☁️
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          .result-card {
            width: 120px;
            height: 168px;
            background: #ffffff;
            border: 2px solid #333;
            border-radius: 12px;
            margin: 0 auto;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .result-card:hover {
            transform: scale(1.05);
          }

          @keyframes cardReveal {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .confetti-piece {
            width: 12px;
            height: 12px;
            animation: confettiFall linear infinite;
          }
          
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg) scale(1);
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg) scale(0.5);
              opacity: 0;
            }
          }

          .firework {
            animation: fireworkExplode 2s ease-out infinite;
          }

          @keyframes fireworkExplode {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(1.5) rotate(180deg);
              opacity: 0.8;
            }
            100% {
              transform: scale(0.5) rotate(360deg);
              opacity: 0;
            }
          }

          .heart {
            animation: heartFloat 3s ease-in-out infinite;
          }

          @keyframes heartFloat {
            0% {
              transform: translateY(100vh) scale(0) rotate(0deg);
              opacity: 0;
            }
            20% {
              opacity: 1;
              transform: translateY(80vh) scale(1) rotate(10deg);
            }
            80% {
              opacity: 1;
              transform: translateY(20vh) scale(1.2) rotate(-10deg);
            }
            100% {
              transform: translateY(-20vh) scale(0.8) rotate(0deg);
              opacity: 0;
            }
          }
          
          .plane {
            animation: planeFlyEnhanced 5s ease-in-out infinite;
          }
          
          @keyframes planeFlyEnhanced {
            0% {
              transform: translateX(-150px) rotateZ(-5deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: translateX(50vw) rotateZ(2deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(calc(100vw + 150px)) rotateZ(-5deg);
              opacity: 0;
            }
          }

          .cloud {
            animation: cloudDrift 8s ease-in-out infinite;
          }

          @keyframes cloudDrift {
            0% {
              transform: translateX(-100px);
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              transform: translateX(calc(100vw + 100px));
              opacity: 0.3;
            }
          }

          .result-emoji {
            font-size: 4rem;
            margin: 1rem 0;
            animation: ${result?.isWin ? 'celebrationBounce' : 'sadFloat'} 2s ease-out infinite;
          }

          @keyframes celebrationBounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) scale(1);
            }
            40% {
              transform: translateY(-30px) scale(1.2);
            }
            60% {
              transform: translateY(-15px) scale(1.1);
            }
          }

          @keyframes sadFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(-5deg);
            }
          }
          
          .win-result {
            color: #f1c40f;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            line-height: 1.2;
            animation: titleGlow 2s ease-in-out infinite alternate;
          }

          @keyframes titleGlow {
            0% {
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(241, 196, 15, 0.5);
            }
            100% {
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(241, 196, 15, 0.8);
            }
          }
          
          .lose-result {
            color: #333;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
            line-height: 1.3;
          }
          
          .prize-name {
            display: inline-block;
            color: #ffffff;
            font-size: 1.1em;
            font-weight: 800;
            padding: 0.2rem 0;
            text-shadow: 
              2px 2px 0px rgba(0, 0, 0, 0.8),
              4px 4px 8px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(255, 215, 0, 0.6);
            animation: prizeGlow 2s ease-in-out infinite alternate;
          }
          
          .miss-text {
            display: inline-block;
            color: #e74c3c;
            font-size: 1.2em;
            animation: missShake 0.5s ease-in-out;
          }
          
          @keyframes prizeGlow {
            0% {
              transform: scale(1);
              text-shadow: 
                2px 2px 0px rgba(0, 0, 0, 0.8),
                4px 4px 8px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(255, 215, 0, 0.6);
            }
            100% {
              transform: scale(1.05);
              text-shadow: 
                2px 2px 0px rgba(0, 0, 0, 0.8),
                4px 4px 8px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(255, 215, 0, 0.8);
            }
          }
          
          @keyframes missShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default Scene4; 