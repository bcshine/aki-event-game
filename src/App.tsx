import React, { useState } from 'react';
import './App.css';
import Scene1 from './components/Scene1';
import Scene2 from './components/Scene2';
import Scene3 from './components/Scene3';
import Scene4 from './components/Scene4';
import Scene5 from './components/Scene5';


export interface GameResult {
  cardNumber: number;
  prize: string;
  isWin: boolean;
}

function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const nextScene = () => {
    setCurrentScene(prev => prev + 1);
  };

  const resetGame = () => {
    setCurrentScene(1);
    setGameResult(null);
  };

  const handleCardSelect = (cardNumber: number) => {
    // 상품 목록 (1/9 확률)
    const prizes = [
      "전체 금액 10% 할인",
      "3만원 사케 증정", 
      "5만원 요리 서비스",
      "명품 고급 젓가락 세트",
      "오리지널 블렌딩 호지차",
      "특별한 소금 세트",
      "편백나무(히노키) 큐브",
      "아쉽지만, 꽝!",
      "일본 고급 츠케모노"
    ];

    const randomIndex = Math.floor(Math.random() * 9);
    const prize = prizes[randomIndex];
    const isWin = prize !== "아쉽지만, 꽝!";

    setGameResult({
      cardNumber,
      prize,
      isWin
    });

    nextScene();
  };

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene1 onStart={nextScene} />;
      case 2:
        return <Scene2 onCardSelect={handleCardSelect} />;
      case 3:
        return <Scene3 onComplete={nextScene} result={gameResult} />;
              case 4:
          return <Scene4 result={gameResult} onNext={nextScene} onReset={resetGame} />;
        case 5:
          return <Scene5 result={gameResult} onReset={resetGame} />;
      default:
        return <Scene1 onStart={nextScene} />;
    }
  };

  return (
    <div className="App">
      {renderScene()}
    </div>
  );
}

export default App;
