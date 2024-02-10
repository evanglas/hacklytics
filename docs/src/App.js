import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Gamenav from "./components/Gamenav";
import UpDown from "./components/UpDown";
import { useState, useEffect } from "react";
import stockData from "./pct_change.json";

function App() {
  const [isCorrect, setIsCorrect] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [headline, setHeadline] = useState("Stonk Go Up!");
  const [date, setDate] = useState(new Date());
  const [stockName, setStockName] = useState("GME");
  const [round, setRound] = useState(1);
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    const firstStock = getNextStock();
    updateScoreboard(firstStock);
  }, []);

  const getBotGuess = () => {
    return Math.random() > 0.5 ? "Up" : "Down";
  };
  const isGuessCorrect = (guess) => {
    return guess === "Up" ? isUp : !isUp;
  };

  const logGuesses = (userGuess, botGuess) => {
    console.log("User Guess: ", userGuess);
    console.log("Bot Guess: ", botGuess);
  };

  const getNextStock = () => {
    return stockData[Math.floor(Math.random() * stockData.length)];
  };

  const updateScores = (userGuess, botGuess) => {
    if (isGuessCorrect(userGuess)) {
      setIsCorrect(true);
      setUserScore(userScore + 1);
      setHeadline("You Win!");
    } else {
      setIsCorrect(false);
      setBotScore(botScore + 1);
      setHeadline("You Lose!");
    }
  };

  const handleGuess = (guess) => {
    const botGuess = getBotGuess();
    logGuesses(guess, botGuess);
    updateScores(guess, botGuess);
    updateScoreboard(getNextStock());
    setTimeout(() => {
      setIsCorrect(null);
    }, 500);
  };

  const updateScoreboard = (nextStock) => {
    const nextIsUp = nextStock.percent_change > 0;
    setIsUp(nextIsUp);

    const nextStockName = nextStock.stock;
    setStockName(nextStockName);

    const nextHeadline = nextStock.title;
    setHeadline(nextHeadline);

    const nextDate = new Date(nextStock.date);
    setDate(nextDate);
  };

  return (
    <div
      className={`app-wrapper ${
        isCorrect !== null ? (isCorrect ? "correct" : "incorrect") : ""
      } flex flex-col justify-center items-center w-screen h-screen p-5`}
    >
      <Scoreboard
        userScore={userScore}
        botScore={botScore}
        headline={headline}
        date={date}
        stockName={stockName}
        round={round}
        isUp={isUp}
      />
      <UpDown handleGuess={handleGuess} />
      <Gamenav />
    </div>
  );
}

export default App;
