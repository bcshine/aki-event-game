import React from 'react';
import akiLogo from '../assets/aki.png';

interface Scene1Props {
  onStart: () => void;
}

const Scene1: React.FC<Scene1Props> = ({ onStart }) => {
  return (
    <div className="scene" style={{ 
      background: '#000000',
      minHeight: '100vh'
    }}>
      <div style={{ 
        animation: 'fadeInUp 1s ease-out',
        textAlign: 'center'
      }}>
        <h1 className="brand-title" style={{
          animation: 'fadeInDown 1s ease-out 0.3s both'
        }}>
          아카아키 오마카세
          <br />
          이벤트 게임
        </h1>
        
        <img 
          src={akiLogo} 
          alt="AKI Logo" 
          className="logo"
          style={{
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}
        />
        
        <div style={{
          animation: 'fadeInUp 1s ease-out 0.9s both'
        }}>
          <h2 className="subtitle">아키 아키 행운의 카드</h2>
          <p className="description">행운의 선물을 드립니다</p>
        </div>
        
        <button 
          className="btn"
          onClick={onStart}
          style={{
            animation: 'fadeInUp 1s ease-out 1.2s both'
          }}
        >
          시작하기
        </button>
      </div>

      <style>
        {`
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
          
          .brand-title {
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffb347, #ffd700);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease-in-out infinite;
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Scene1; 