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

  useEffect(() => {
    if (result) {
      if (result.isWin) {
        setShowConfetti(true);
        // 폭죽 효과 3초 후 제거
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setShowPlanes(true);
        // 비행기 효과 2초 후 제거
        setTimeout(() => setShowPlanes(false), 2000);
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

      {/* 폭죽 효과 (당첨시) */}
      {showConfetti && (
        <div className="confetti">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f1c40f', '#e74c3c'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      {/* 비행기 효과 (꽝일때) */}
      {showPlanes && (
        <div className="planes">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="plane"
              style={{
                position: 'absolute',
                fontSize: '2rem',
                animationDelay: `${i * 0.5}s`,
                top: `${20 + i * 15}%`
              }}
            >
              ✈️
            </div>
          ))}
        </div>
      )}

      <style>
        {`
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
            width: 10px;
            height: 10px;
            animation: confettiFall 3s linear infinite;
          }
          
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          
          .plane {
            animation: planeFly 2s ease-in-out infinite;
          }
          
          @keyframes planeFly {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(calc(100vw + 100px));
              opacity: 0;
            }
          }
          
          .win-result {
            color: #f1c40f;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            line-height: 1.2;
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
                0 0 15px rgba(255, 215, 0, 0.4);
            }
            100% { 
              transform: scale(1.02);
              text-shadow: 
                3px 3px 0px rgba(0, 0, 0, 0.9),
                6px 6px 12px rgba(0, 0, 0, 0.6),
                0 0 30px rgba(255, 215, 0, 0.8);
            }
          }
          
          @keyframes missShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .result-emoji {
            font-size: 4rem;
            margin: 1rem 0;
            animation: bounceIn 1s ease-out 0.5s both;
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Scene4; 