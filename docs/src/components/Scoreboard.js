export default function Scoreboard(props) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-between items-center bg-white fixed top-0 rounded-b-3xl">
        <div className="p-5 text-black">User: {props.userScore}</div>
        <div className="p-5 text-black text-xl">Round {props.round}</div>
        <div className="p-5 text-black">Bot: {props.botScore}</div>
      </div>
      <div className="flex flex-col w-full items-center h-48">
        <div className="flex flex-row justify-around mt-10">
          <div className="px-3 text-5xl font-bold">{props.stockName}</div>
          <div className="px-3 text-5xl">
            {props.date.toLocaleString("default", { month: "long" })},{" "}
            {props.date.getDate()}, {props.date.getFullYear()}
          </div>
        </div>
        <div
          className="flex flex-row max-w-5xl text-3xl mt-2 text-center justify-center"
          style={{ fontFamily: "Courier New, Courier, monospace" }}
        >
          {props.headline}
        </div>
        {/* <div className="flex flex-row justify-center">
          {props.isUp ? "Up" : "Down"}
        </div> */}
      </div>
    </div>
  );
}
