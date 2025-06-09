import React, { useState, useEffect, useCallback } from 'react';
import { GameResult } from '../App';

interface Scene3Props {
  onComplete: () => void;
  result: GameResult | null;
}

interface Card {
  id: number;
  value: string;
  suit: string;
  color: string;
  symbol: string;
}

const Scene3: React.FC<Scene3Props> = ({ onComplete, result }) => {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isShuffling, setIsShuffling] = useState(true);

  // 다양한 카드 생성 (Scene2와 동일한 로직)
  const generateAllCards = useCallback((): Card[] => {
    const suits = [
      { name: 'diamond', symbol: '♦', color: '#e74c3c' },
      { name: 'heart', symbol: '♥', color: '#e74c3c' },
      { name: 'spade', symbol: '♠', color: '#2c3e50' },
      { name: 'club', symbol: '♣', color: '#2c3e50' }
    ];
    
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const specialCards = [
      { value: 'JOKER', suit: 'joker', color: '#8e44ad', symbol: '🃏' }
    ];
    
    const allCards = [];
    
    // 일반 카드들
    suits.forEach(suit => {
      values.forEach(value => {
        allCards.push({
          value,
          suit: suit.name,
          color: suit.color,
          symbol: suit.symbol
        });
      });
    });
    
    // 조커 추가
    allCards.push(...specialCards);
    
    return allCards.map((card, index) => ({
      id: index + 1,
      ...card
    }));
  }, []);

  const getRandomCard = useCallback((): Card => {
    const allCards = generateAllCards();
    const randomIndex = Math.floor(Math.random() * allCards.length);
    return allCards[randomIndex];
  }, [generateAllCards]);

  const renderCardContent = (card: Card) => {
    const symbolStyle = {
      color: card.color,
      fontSize: '2.5rem',
      lineHeight: '1'
    };

    // 조커 카드
    if (card.suit === 'joker') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <span style={{ fontSize: '4rem' }}>🃏</span>
        </div>
      );
    }

    // J, Q, K, A 카드
    if (['J', 'Q', 'K', 'A'].includes(card.value)) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
          <span style={{ ...symbolStyle, fontSize: '3.5rem' }}>{card.value}</span>
          <span style={{ ...symbolStyle, fontSize: '2rem', marginTop: '0.5rem' }}>{card.symbol}</span>
        </div>
      );
    }

    // 숫자 카드 (2-10)
    const numValue = parseInt(card.value);
    if (numValue >= 2 && numValue <= 10) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
          <span style={{ ...symbolStyle, fontSize: '3.5rem' }}>{card.value}</span>
          <span style={{ ...symbolStyle, fontSize: '2rem', marginTop: '0.5rem' }}>{card.symbol}</span>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    // 빠른 카드 변경 애니메이션
    const shuffleInterval = setInterval(() => {
      setCurrentCard(getRandomCard());
    }, 100);

    // 5초 후 애니메이션 종료
    const timer = setTimeout(() => {
      clearInterval(shuffleInterval);
      setIsShuffling(false);
      
      // 최종 결과에 해당하는 카드 표시 (임시로 랜덤 카드 사용)
      setCurrentCard(getRandomCard());
      
      // 2초 후 다음 씬으로
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 5000);

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(timer);
    };
  }, [onComplete, getRandomCard]);

  return (
    <div className="scene" style={{ 
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      minHeight: '100vh'
    }}>
      <h1 className="scene-title" style={{
        animation: 'fadeInDown 0.8s ease-out',
        color: '#333'
      }}>
        추첨중...
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

        {/* 중앙 카드 */}
        <div className={`single-card-container ${isShuffling ? 'shuffling' : 'final'}`}>
          {currentCard && (
            <div className="shuffle-card-single">
              {currentCard.suit !== 'joker' && (
                <>
                  <div className="card-corner top-left">
                    <div className="card-number" style={{ color: currentCard.color }}>
                      {currentCard.value}
                    </div>
                    <div className="card-suit" style={{ color: currentCard.color }}>
                      {currentCard.symbol}
                    </div>
                  </div>
                  
                  <div className="card-corner bottom-right">
                    <div className="card-number" style={{ color: currentCard.color }}>
                      {currentCard.value}
                    </div>
                    <div className="card-suit" style={{ color: currentCard.color }}>
                      {currentCard.symbol}
                    </div>
                  </div>
                </>
              )}
              
              <div className="card-center">
                {renderCardContent(currentCard)}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .premium-shuffle-container {
            position: relative;
            width: 600px;
            height: 500px;
            margin: 2rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .rotating-stars {
            position: absolute;
            width: 400px;
            height: 400px;
            animation: rotateStars 4s linear infinite;
            z-index: 1;
          }
          
          .star {
            position: absolute;
            font-size: 1.5rem;
            animation: starTwinkle 1s ease-in-out infinite alternate;
            transform-origin: center;
          }
          
          .magic-circles {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
          }
          
          .magic-circle {
            position: absolute;
            border-radius: 50%;
            border: 2px solid;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          
          .outer-circle {
            width: 450px;
            height: 450px;
            border-color: rgba(255, 215, 0, 0.6);
            animation: magicRotate 6s linear infinite;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          }
          
          .middle-circle {
            width: 350px;
            height: 350px;
            border-color: rgba(255, 105, 180, 0.6);
            animation: magicRotate 4s linear infinite reverse;
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
          }
          
          .inner-circle {
            width: 250px;
            height: 250px;
            border-color: rgba(138, 43, 226, 0.6);
            animation: magicRotate 3s linear infinite;
            box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
          }
          
          .sparkle-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
          }
          
          .particle {
            position: absolute;
            font-size: 0.8rem;
            animation: sparkle 2s ease-in-out infinite;
          }
          
          .single-card-container {
            position: relative;
            z-index: 10;
            transition: all 0.5s ease;
          }
          
          .single-card-container.shuffling {
            animation: cardPulse 0.2s ease-in-out infinite alternate;
          }
          
          .single-card-container.final {
            animation: cardReveal 1s ease-out;
          }
          
          .shuffle-card-single {
            width: 160px;
            height: 220px;
            background: #ffffff;
            border-radius: 16px;
            border: 3px solid #333;
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 215, 0, 0.2);
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 12px;
            font-family: 'Noto Sans KR', sans-serif;
            font-weight: 700;
          }
          
          .card-corner {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1rem;
            line-height: 1;
          }
          
          .top-left {
            top: 12px;
            left: 12px;
          }
          
          .bottom-right {
            bottom: 12px;
            right: 12px;
            transform: rotate(180deg);
          }
          
          .card-number {
            font-weight: bold;
            font-size: 1.2rem;
          }
          
          .card-suit {
            font-size: 1rem;
            margin-top: 2px;
          }
          
          .card-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 35px 15px;
            position: relative;
          }
          
          @keyframes rotateStars {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes starTwinkle {
            0% { 
              opacity: 0.3; 
              transform: scale(0.8);
            }
            100% { 
              opacity: 1; 
              transform: scale(1.2);
            }
          }
          
          @keyframes magicRotate {
            from { 
              transform: translate(-50%, -50%) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
            to { 
              transform: translate(-50%, -50%) rotate(360deg);
              opacity: 0.6;
            }
          }
          
          @keyframes sparkle {
            0% { 
              opacity: 0; 
              transform: translateY(0px) scale(0.5);
            }
            50% { 
              opacity: 1; 
              transform: translateY(-20px) scale(1);
            }
            100% { 
              opacity: 0; 
              transform: translateY(-40px) scale(0.5);
            }
          }
          
          @keyframes cardPulse {
            0% { 
              transform: scale(1) rotateY(0deg);
              filter: brightness(1);
            }
            100% { 
              transform: scale(1.05) rotateY(5deg);
              filter: brightness(1.1);
            }
          }
          
          @keyframes cardReveal {
            0% { 
              transform: scale(1.1) rotateY(180deg);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.2) rotateY(90deg);
              opacity: 0.8;
            }
            100% { 
              transform: scale(1) rotateY(0deg);
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
              transform: translateY(30px);
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