export default function Scoreboard(props) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-between items-center bg-white p-1 fixed top-0 rounded-b-3xl">
        <div className="p-5 text-black">User: {props.userScore}</div>
        <div className="p-5 text-black text-xl">Round {props.round}</div>
        <div className="p-5 text-black">Bot: {props.botScore}</div>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row justify-around w-2/3">
          <div className="text-3xl font-semibold">Stock: {props.stockName}</div>
          <div className="text-3xl font-semibold">
            Date: {props.date.getMonth()}/{props.date.getDate()}/
            {props.date.getFullYear()}
          </div>
        </div>
        <div className="w-full flex flex-row text-3xl m-5 justify-center italic">
          {props.headline}
        </div>
        {/* <div className="flex flex-row justify-center">
          {props.isUp ? "Up" : "Down"}
        </div> */}
      </div>
    </div>
  );
}
