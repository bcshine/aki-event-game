import React, { useState } from 'react';

interface Scene2Props {
  onCardSelect: (cardNumber: number) => void;
}

interface Card {
  id: number;
  value: string;
  suit: string;
  color: string;
  symbol: string;
}

const Scene2: React.FC<Scene2Props> = ({ onCardSelect }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // 다양한 카드 생성
  const generateRandomCards = (): Card[] => {
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
    
    // 9장 랜덤 선택
    const selectedCards = [];
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 9; i++) {
      selectedCards.push({
        id: i + 1,
        ...shuffled[i]
      });
    }
    
    return selectedCards;
  };

  const [cards] = useState<Card[]>(generateRandomCards());

  const handleCardClick = (cardNumber: number) => {
    onCardSelect(cardNumber);
  };

  const handleCardHover = (cardNumber: number) => {
    setHoveredCard(cardNumber);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const renderCardContent = (card: Card) => {
    const symbolStyle = {
      color: card.color,
      fontSize: '1.8rem',
      lineHeight: '1'
    };

    // 조커 카드
    if (card.suit === 'joker') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <span style={{ fontSize: '3rem' }}>🃏</span>
        </div>
      );
    }

    // J, Q, K, A 카드
    if (['J', 'Q', 'K', 'A'].includes(card.value)) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
          <span style={{ ...symbolStyle, fontSize: '2.5rem' }}>{card.value}</span>
          <span style={{ ...symbolStyle, fontSize: '1.5rem', marginTop: '0.3rem' }}>{card.symbol}</span>
        </div>
      );
    }

    // 숫자 카드 (2-10)
    const numValue = parseInt(card.value);
    if (numValue >= 2 && numValue <= 10) {
      const symbols = Array(numValue).fill(card.symbol);
      
      if (numValue <= 3) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
            {symbols.map((symbol, idx) => (
              <span key={idx} style={{ ...symbolStyle, transform: idx === symbols.length - 1 && numValue > 1 ? 'rotate(180deg)' : 'none' }}>
                {symbol}
              </span>
            ))}
          </div>
        );
      } else if (numValue <= 6) {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: `repeat(${Math.ceil(numValue / 2)}, 1fr)`, height: '100%', gap: '0.2rem', placeItems: 'center' }}>
            {symbols.map((symbol, idx) => (
              <span key={idx} style={{ ...symbolStyle, transform: idx >= Math.ceil(numValue / 2) ? 'rotate(180deg)' : 'none' }}>
                {symbol}
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(4, 1fr)', height: '100%', gap: '0.1rem', placeItems: 'center' }}>
            {symbols.slice(0, Math.min(8, numValue)).map((symbol, idx) => (
              <span key={idx} style={{ ...symbolStyle, transform: idx >= 4 ? 'rotate(180deg)' : 'none' }}>
                {symbol}
              </span>
            ))}
            {numValue > 8 && (
              <span style={{ ...symbolStyle, gridColumn: '1 / 3', justifySelf: 'center' }}>
                {card.symbol}
              </span>
            )}
          </div>
        );
      }
    }

    return null;
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
            {card.suit !== 'joker' && (
              <>
                <div className="card-corner top-left">
                  <div className="card-number" style={{ color: card.color }}>
                    {card.value}
                  </div>
                  <div className="card-suit" style={{ color: card.color }}>
                    {card.symbol}
                  </div>
                </div>
                
                <div className="card-corner bottom-right">
                  <div className="card-number" style={{ color: card.color }}>
                    {card.value}
                  </div>
                  <div className="card-suit" style={{ color: card.color }}>
                    {card.symbol}
                  </div>
                </div>
              </>
            )}
            
            <div className="card-center">
              {renderCardContent(card)}
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
            padding: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            font-family: 'Noto Sans KR', sans-serif;
            font-weight: 700;
          }
          
          .card-corner {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 0.9rem;
            line-height: 1;
          }
          
          .top-left {
            top: 8px;
            left: 8px;
          }
          
          .bottom-right {
            bottom: 8px;
            right: 8px;
            transform: rotate(180deg);
          }
          
          .card-number {
            color: #e74c3c;
            font-weight: bold;
            font-size: 1rem;
          }
          
          .card-suit {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 2px;
          }
          
          .card-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 25px 10px;
            position: relative;
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