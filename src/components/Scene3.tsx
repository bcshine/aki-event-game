import React, { useState, useEffect, useCallback } from 'react';
import { GameResult } from '../App';

interface Scene3Props {
  onComplete: () => void;
  result: GameResult | null;
}

const Scene3: React.FC<Scene3Props> = ({ onComplete, result }) => {
  const [isShuffling, setIsShuffling] = useState(true);
  const [currentShuffleCard, setCurrentShuffleCard] = useState<string>('');

  // 모든 카드 이미지 목록
  const allCardImages = [
    `${process.env.PUBLIC_URL}/images/j1.jpg`,
    `${process.env.PUBLIC_URL}/images/j2.png`,
    `${process.env.PUBLIC_URL}/images/ha.jpg`,
    `${process.env.PUBLIC_URL}/images/hj.webp`,
    `${process.env.PUBLIC_URL}/images/hq.png`,
    `${process.env.PUBLIC_URL}/images/hk.jpg`,
    `${process.env.PUBLIC_URL}/images/sa.jpg`,
    `${process.env.PUBLIC_URL}/images/sj.png`,
    `${process.env.PUBLIC_URL}/images/sq.jpg`,
    `${process.env.PUBLIC_URL}/images/sk.jpg`,
    `${process.env.PUBLIC_URL}/images/c1.png`,
    `${process.env.PUBLIC_URL}/images/cj.jpg`,
    `${process.env.PUBLIC_URL}/images/cq.jpg`,
    `${process.env.PUBLIC_URL}/images/ck.jpg`,
    `${process.env.PUBLIC_URL}/images/da.jpg`,
    `${process.env.PUBLIC_URL}/images/dj.jpg`,
    `${process.env.PUBLIC_URL}/images/dq.jpg`,
    `${process.env.PUBLIC_URL}/images/dk.jpg`,
  ];

  const getRandomCard = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * allCardImages.length);
    return allCardImages[randomIndex];
  }, [allCardImages]);

  // 셔플링 효과
  useEffect(() => {
    let shuffleInterval: NodeJS.Timeout;

    if (isShuffling) {
      // 빠른 카드 셔플링 (100ms마다 변경)
      shuffleInterval = setInterval(() => {
        setCurrentShuffleCard(getRandomCard());
      }, 100);
    }

    return () => {
      if (shuffleInterval) {
        clearInterval(shuffleInterval);
      }
    };
  }, [isShuffling, getRandomCard]);

  // 메인 타이머 (5초 후 종료)
  useEffect(() => {
    console.log('Scene3 mounted, starting timer...');
    
    // 5초 후 셔플링 종료
    const mainTimer = setTimeout(() => {
      console.log('5 seconds passed, stopping shuffle...');
      setIsShuffling(false);
      
      // 추가로 2초 후 다음 씬으로
      const nextTimer = setTimeout(() => {
        console.log('Moving to next scene...');
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(nextTimer);
      };
    }, 5000);

    return () => {
      clearTimeout(mainTimer);
    };
  }, [onComplete]);

  // 첫 셔플 카드 설정
  useEffect(() => {
    if (allCardImages.length > 0) {
      setCurrentShuffleCard(getRandomCard());
    }
  }, [getRandomCard]);

  if (!result?.selectedCard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="scene" style={{ 
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      minHeight: '100vh'
    }}>
      <h1 className="scene-title" style={{
        animation: 'fadeInDown 0.8s ease-out',
        color: '#333'
      }}>
        {isShuffling ? '추첨중...' : '추첨 완료!'}
      </h1>
      
      {/* 고급스러운 셔플 컨테이너 */}
      <div className="premium-shuffle-container">
        {/* 회전하는 별들 */}
        {isShuffling && (
          <div className="rotating-stars">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  transform: `rotate(${i * 30}deg) translateX(180px)`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {/* 마법의 원 */}
        {isShuffling && (
          <div className="magic-circles">
            <div className="magic-circle outer-circle"></div>
            <div className="magic-circle middle-circle"></div>
            <div className="magic-circle inner-circle"></div>
          </div>
        )}

        {/* 빛나는 파티클 */}
        {isShuffling && (
          <div className="sparkle-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        )}

        {/* 중앙 카드 - 셔플링 중에는 랜덤 카드, 완료 후에는 선택한 카드 */}
        <div className={`single-card-container ${isShuffling ? 'shuffling' : 'final'}`}>
          <div className="shuffle-card-single">
            <img 
              src={isShuffling ? currentShuffleCard : result.selectedCard.imagePath}
              alt={isShuffling ? "Shuffling card" : `${result.selectedCard.suit} ${result.selectedCard.value}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
              onError={(e) => {
                // 이미지 로드 실패 시 대체 텍스트 표시
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
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#f0f0f0',
                borderRadius: '15px'
              }}
            >
              {isShuffling ? '🎴' : (result.selectedCard.value === 'JOKER' ? '🃏' : result.selectedCard.value)}
            </div>
          </div>
        </div>

        {/* 완료 상태일 때 추가 텍스트 */}
        {!isShuffling && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#333',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            animation: 'fadeInUp 0.5s ease-out'
          }}>
            선택한 카드: {result.selectedCard.value}
          </div>
        )}
      </div>

      <style>
        {`
          .premium-shuffle-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 70vh;
            width: 100%;
          }

          .rotating-stars {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .star {
            position: absolute;
            font-size: 1.5rem;
            animation: rotateStars 3s linear infinite;
          }

          .magic-circles {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .magic-circle {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .outer-circle {
            width: 400px;
            height: 400px;
            animation: rotateMagic 4s linear infinite;
          }

          .middle-circle {
            width: 300px;
            height: 300px;
            animation: rotateMagic 3s linear infinite reverse;
          }

          .inner-circle {
            width: 200px;
            height: 200px;
            animation: rotateMagic 2s linear infinite;
          }

          .sparkle-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .particle {
            position: absolute;
            font-size: 1rem;
            animation: sparkle 2s ease-in-out infinite;
          }

          .single-card-container {
            position: relative;
            z-index: 10;
            transition: all 0.5s ease;
          }

          .single-card-container.shuffling {
            animation: cardShuffleEffect 0.15s ease-in-out infinite alternate;
          }

          .single-card-container.final {
            animation: cardFinalReveal 1s ease-out;
          }

          .shuffle-card-single {
            width: 200px;
            height: 280px;
            background: #ffffff;
            border: 3px solid #333;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            overflow: hidden;
          }

          @keyframes rotateStars {
            from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
          }

          @keyframes rotateMagic {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes cardShuffleEffect {
            0% { 
              transform: rotateY(-5deg) scale(1);
              filter: brightness(1);
            }
            100% { 
              transform: rotateY(5deg) scale(1.02);
              filter: brightness(1.1);
            }
          }

          @keyframes cardFinalReveal {
            0% { 
              transform: rotateY(90deg) scale(0.8);
              opacity: 0;
            }
            50% {
              transform: rotateY(45deg) scale(1.1);
              opacity: 0.7;
            }
            100% { 
              transform: rotateY(0deg) scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Scene3; 