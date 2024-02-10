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

  const handleGuess = (guess) => {
    console.log("User Guess: ", guess);
    const botGuess = getBotGuess();
    console.log("Bot Guess: ", botGuess);

    if (isGuessCorrect(guess)) {
      setUserScore(userScore + 1);
      setHeadline("You Win!");
    } else {
      setBotScore(botScore + 1);
      setHeadline("You Lose!");
    }
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
