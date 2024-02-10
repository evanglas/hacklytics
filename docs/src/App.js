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
      <UpDown />
      <Gamenav />
    </div>
  );
}

export default App;
