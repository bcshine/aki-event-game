import React, { useState } from 'react';
import { SelectedCard } from '../App';

interface Scene2Props {
  onCardSelect: (cardNumber: number, selectedCard: SelectedCard) => void;
}

interface Card {
  id: number;
  value: string;
  suit: string;
  imagePath: string;
}

const Scene2: React.FC<Scene2Props> = ({ onCardSelect }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // 실제 이미지 파일들을 사용한 카드 생성
  const generateRandomCards = (): Card[] => {
    const availableCards = [
      // 조커 카드들
      { value: 'JOKER', suit: 'joker', imagePath: `${process.env.PUBLIC_URL}/images/j1.jpg` },
      { value: 'JOKER', suit: 'joker', imagePath: `${process.env.PUBLIC_URL}/images/j2.png` },
      
      // 하트 카드들
      { value: 'A', suit: 'heart', imagePath: `${process.env.PUBLIC_URL}/images/ha.jpg` },
      { value: 'J', suit: 'heart', imagePath: `${process.env.PUBLIC_URL}/images/hj.webp` },
      { value: 'Q', suit: 'heart', imagePath: `${process.env.PUBLIC_URL}/images/hq.png` },
      { value: 'K', suit: 'heart', imagePath: `${process.env.PUBLIC_URL}/images/hk.jpg` },
      
      // 스페이드 카드들
      { value: 'A', suit: 'spade', imagePath: `${process.env.PUBLIC_URL}/images/sa.jpg` },
      { value: 'J', suit: 'spade', imagePath: `${process.env.PUBLIC_URL}/images/sj.png` },
      { value: 'Q', suit: 'spade', imagePath: `${process.env.PUBLIC_URL}/images/sq.jpg` },
      { value: 'K', suit: 'spade', imagePath: `${process.env.PUBLIC_URL}/images/sk.jpg` },
      
      // 클럽 카드들
      { value: 'A', suit: 'club', imagePath: `${process.env.PUBLIC_URL}/images/c1.png` },
      { value: 'J', suit: 'club', imagePath: `${process.env.PUBLIC_URL}/images/cj.jpg` },
      { value: 'Q', suit: 'club', imagePath: `${process.env.PUBLIC_URL}/images/cq.jpg` },
      { value: 'K', suit: 'club', imagePath: `${process.env.PUBLIC_URL}/images/ck.jpg` },
      
      // 다이아몬드 카드들
      { value: 'A', suit: 'diamond', imagePath: `${process.env.PUBLIC_URL}/images/da.jpg` },
      { value: 'J', suit: 'diamond', imagePath: `${process.env.PUBLIC_URL}/images/dj.jpg` },
      { value: 'Q', suit: 'diamond', imagePath: `${process.env.PUBLIC_URL}/images/dq.jpg` },
      { value: 'K', suit: 'diamond', imagePath: `${process.env.PUBLIC_URL}/images/dk.jpg` },
    ];
    
    // 9장 랜덤 선택
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    const selectedCards = shuffled.slice(0, 9).map((card, index) => ({
      id: index + 1,
      ...card
    }));
    
    return selectedCards;
  };

  const [cards] = useState<Card[]>(generateRandomCards());

  const handleCardClick = (cardNumber: number) => {
    const selectedCard = cards.find(card => card.id === cardNumber);
    if (selectedCard) {
      onCardSelect(cardNumber, selectedCard);
    }
  };

  const handleCardHover = (cardNumber: number) => {
    setHoveredCard(cardNumber);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="scene" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <h1 className="scene-title" style={{
        animation: 'fadeInDown 0.8s ease-out'
      }}>
        카드 하나 골라주세요!
      </h1>
      
      <div className="card-grid" style={{
        animation: 'fadeInUp 1s ease-out 0.3s both'
      }}>
        {cards.map((card) => (
          <button
            key={card.id}
            className="playing-card"
            onClick={() => handleCardClick(card.id)}
            onMouseEnter={() => handleCardHover(card.id)}
            onMouseLeave={handleCardLeave}
            style={{
              transform: hoveredCard === card.id 
                ? 'translateY(-5px) scale(1.05) rotate(2deg)' 
                : 'translateY(0) scale(1) rotate(0deg)',
              animation: `cardAppear 0.6s ease-out ${(card.id - 1) * 0.1}s both, ${
                hoveredCard === card.id ? 'cardShake 0.5s ease-in-out' : ''
              }`,
              boxShadow: hoveredCard === card.id
                ? '0 15px 35px rgba(0, 0, 0, 0.4)'
                : '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
          >
            <img 
              src={card.imagePath} 
              alt={`${card.suit} ${card.value}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
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
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px'
              }}
            >
              {card.value === 'JOKER' ? '🃏' : `${card.value}`}
            </div>
          </button>
        ))}
      </div>

      <style>
        {`
          .playing-card {
            aspect-ratio: 2.5/3.5;
            background: #ffffff;
            border: 2px solid #333;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 0;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }
          
          @keyframes cardAppear {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes cardShake {
            0%, 100% { transform: translateY(-5px) scale(1.05) rotate(2deg); }
            25% { transform: translateY(-5px) scale(1.05) rotate(-1deg); }
            75% { transform: translateY(-5px) scale(1.05) rotate(1deg); }
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

export default Scene2; 