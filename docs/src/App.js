import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Gamenav from "./components/Gamenav";
import UpDown from "./components/UpDown";
import { useState, useEffect } from "react";

function App() {
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [headline, setHeadline] = useState("Stonk Go Up!");
  const [date, setDate] = useState(new Date());
  const [stockName, setStockName] = useState("GME");
  const [round, setRound] = useState(1);
  const [isUp, setIsUp] = useState(false);

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

  const updateScores = (userGuess, botGuess) => {
    if (isGuessCorrect(userGuess)) {
      setUserScore(userScore + 1);
      setHeadline("You Win!");
    } else {
      setBotScore(botScore + 1);
      setHeadline("You Lose!");
    }
  };

  const updateHeadline = () => {
    setHeadline(round % 2 === 0 ? "Stonk Go Up!" : "Stonk Go Down!");
  };

  const updateRound = () => {
    setRound(round + 1);
  };

  const updateDate = () => {
    setDate(new Date());
  };

  const updateStockName = () => {
    setStockName(stockName === "GME" ? "AMC" : "GME");
  };

  const handleGuess = (guess) => {
    const botGuess = getBotGuess();
    logGuesses(guess, botGuess);
    updateScores(guess, botGuess);
    updateRound();
    updateHeadline();
    updateDate();
    updateStockName();
  };

  return (
    <div>
      <Scoreboard
        userScore={userScore}
        botScore={botScore}
        headline={headline}
        date={date}
        stockName={stockName}
        round={round}
      />
      <UpDown handleGuess={handleGuess} />
      <Gamenav />
    </div>
  );
}

export default App;
