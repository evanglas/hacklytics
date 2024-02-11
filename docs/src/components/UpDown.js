import UpDownButton from "./UpDownButton";
import StockPriceChart from "./StockPriceChart";
import { useState } from "react";
import tdata from "./tdata.json";

const closes = tdata["Close"];

export default function UpDown(props) {
  return (
    <div className="flex flex-row justify-around items-center">
      <UpDownButton text="Down" color="red" handleGuess={props.handleGuess} />
      <div className="w-[500px] h-52 rounded-xl">
        <StockPriceChart
          stockData={closes}
          showAfterData={props.showAfterData}
        />
      </div>
      <UpDownButton text="Up" color="green" handleGuess={props.handleGuess} />
    </div>
  );
}
