import React from 'react';
import { GameResult } from '../App';

interface Scene5Props {
  result: GameResult | null;
  onReset: () => void;
}

const Scene5: React.FC<Scene5Props> = ({ result, onReset }) => {
  if (!result || !result.isWin) return null;

  // 쿠폰 코드 생성 (현재 날짜 기반)
  const generateCouponCode = () => {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `AKI${dateString}${randomPart}`;
  };

  // 유효기간 계산 (1개월 후)
  const getExpiryDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('ko-KR');
  };

  const couponCode = generateCouponCode();
  const expiryDate = getExpiryDate();

  // 쿠폰 이미지 저장 함수
  const handleSaveCoupon = () => {
    // 쿠폰 이미지 생성을 위한 Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // 쿠폰 크기 설정
    canvas.width = 800;
    canvas.height = 500;
    
    // 배경 그라디언트
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a8edea');
    gradient.addColorStop(1, '#fed6e3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 쿠폰 테두리
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 8;
    ctx.setLineDash([20, 10]);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // 내부 흰색 배경
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // 텍스트 스타일 설정
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // 제목
    ctx.font = 'bold 36px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('🎁 아키아키 당첨 쿠폰', canvas.width / 2, 120);
    
    // 상품명
    ctx.font = 'bold 42px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText(result.prize, canvas.width / 2, 180);
    
    // 쿠폰 코드 배경
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(150, 210, 500, 60);
    
    // 쿠폰 코드
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(couponCode, canvas.width / 2, 250);
    
    // 유효기간
    ctx.font = '20px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#333333';
    ctx.shadowBlur = 0;
    ctx.fillText(`유효기간: ${expiryDate}까지`, canvas.width / 2, 320);
    
    // 사용법
    ctx.font = '18px "Noto Sans KR", sans-serif';
    ctx.fillText('사용법: 매장 방문시 이 코드를 제시해주세요', canvas.width / 2, 350);
    
    // 하단 메시지
    ctx.font = '16px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('아키아키는 고객님의 더 좋은 경험을 위하여, 항상 최선을 다하겠습니다.', canvas.width / 2, 420);
    
    // 이미지 다운로드
    const link = document.createElement('a');
    link.download = `아키아키_쿠폰_${couponCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="scene" style={{ 
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        animation: 'fadeInUp 1s ease-out',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 className="scene-title" style={{
          color: '#333',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          축하합니다. 쿠폰을 받으세요!
        </h1>
        
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

        <div className="coupon" style={{
          animation: 'slideInUp 1s ease-out 0.3s both',
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          margin: '2rem auto',
          maxWidth: '400px',
          border: '3px dashed #ff6b6b'
        }}>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            🎁 {result.prize}
          </h3>
          
          <div className="coupon-code" style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            margin: '1.5rem 0',
            border: '2px solid #fff'
          }}>
            {couponCode}
          </div>
          
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#666',
            lineHeight: '1.6'
          }}>
            <p><strong>유효기간:</strong> {expiryDate}까지</p>
            <p><strong>사용법:</strong> 매장 방문시 이 코드를 제시해주세요</p>
          </div>
        </div>
        
        <div style={{
          animation: 'fadeInUp 1s ease-out 0.6s both',
          textAlign: 'center'
        }}>
          <p className="description" style={{ 
            color: '#333',
            fontSize: '1.1rem',
            margin: '2rem 0' 
          }}>
            다음에 또 도전해보세요!
          </p>
          
          <p style={{ 
            color: '#555',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: '1.5rem 0'
          }}>
            아키아키는 고객님의 더 좋은 경험을 위하여,<br />
            항상 최선을 다하겠습니다.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
            maxWidth: '400px',
            margin: '2rem auto 0 auto'
          }}>
            <button 
              className="btn coupon-save-btn"
              onClick={handleSaveCoupon}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                width: '190px',
                height: '56px'
              }}
            >
              📱 쿠폰저장
            </button>
            
            <button 
              className="btn-secondary btn"
              onClick={onReset}
              style={{
                width: '190px',
                height: '56px',
                fontSize: '16px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              🏠 홈으로
            </button>
          </div>
        </div>
      </div>

      {/* 배경 장식 효과 */}
      <div className="background-decoration">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              position: 'absolute',
              fontSize: '2rem',
              opacity: 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['🎉', '🎊', '✨', '🎁', '🌸'][i % 5]}
          </div>
        ))}
      </div>

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
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .floating-element {
            animation: floatUpDown 4s ease-in-out infinite;
          }
          
          @keyframes floatUpDown {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .coupon {
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            transform: translateY(0);
            transition: transform 0.3s ease;
          }
          
          .coupon:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .background-decoration {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
          }
          
          .scene > div:first-child {
            position: relative;
            z-index: 2;
          }
          
          .coupon-save-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          
          .coupon-save-btn:active {
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
};

export default Scene5; 