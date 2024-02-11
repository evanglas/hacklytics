import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Gamenav from "./components/Gamenav";
import UpDown from "./components/UpDown";
import { useState, useEffect } from "react";
import stockData from "./sdat.json";

function App() {
  const [isCorrect, setIsCorrect] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [headline, setHeadline] = useState("Stonk Go Up!");
  const [date, setDate] = useState(new Date());
  const [stockName, setStockName] = useState("GME");
  const [round, setRound] = useState(1);
  const [isUp, setIsUp] = useState(false);
  const [opens, setOpens] = useState(stockData[0].open);
  const [showAfterData, setShowAfterData] = useState(false);
  const [guessed, setGuessed] = useState(false);
  const [interpreted, setInterpreted] = useState(false);
  const [explainText, setExplainText] = useState(null);
  const handleShowData = () => {
    setShowAfterData(!showAfterData);
  };

  useEffect(() => {
    const firstStock = getNextStock();
    setOpens(firstStock.open);
    updateScoreboard(firstStock);
  }, []);

  const updateScoreboard = (nextStock) => {
    const openList = Object.entries(nextStock.open).map(([key, value]) => [
      key,
      value,
    ]);
    const lastOpenPrice = openList.slice(-1)[0][1];
    const firstOpenPrice = openList[0][1];
    const nextIsUp = lastOpenPrice > firstOpenPrice;
    setIsUp(nextIsUp);

    const nextStockName = nextStock.ticker;
    setStockName(nextStockName);

    const nextHeadline = nextStock.heading;
    setHeadline(nextHeadline);

    const nextDate = new Date(nextStock.date);
    setDate(nextDate);
  };

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
    } else {
      setIsCorrect(false);
      setBotScore(botScore + 1);
    }
  };

  const handleGuess = (guess) => {
    if (guessed) return;
    setGuessed(true);
    setShowAfterData(true);
    const botGuess = getBotGuess();
    logGuesses(guess, botGuess);
    updateScores(guess, botGuess);
    setTimeout(() => {
      setIsCorrect(null);
    }, 500);
  };

  const handleNextRoundClick = () => {
    setGuessed(false);
    setShowAfterData(false);
    setRound(round + 1);
    const nextStock = getNextStock();
    updateScoreboard(nextStock);
    setOpens(nextStock.open);
    setInterpreted(false);
    setExplainText(null);
  };

  return (
    <div
      className={`app-wrapper flex flex-col items-center bg-black w-screen h-screen p-5 ${
        isCorrect !== null ? (isCorrect ? "correct" : "incorrect") : ""
      }`}
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
      <UpDown
        handleGuess={handleGuess}
        closes={opens}
        showAfterData={showAfterData}
      />
      <Gamenav
        guessed={guessed}
        headline={headline}
        stock={stockName}
        result={isUp ? "Up" : "Down"}
        interpreted={interpreted}
        setInterpreted={setInterpreted}
        handleNextRoundClick={handleNextRoundClick}
        explainText={explainText}
        setExplainText={setExplainText}
      />
    </div>
  );
}

export default App;
