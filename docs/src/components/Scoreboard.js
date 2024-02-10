export default function Scoreboard(props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row lg:w-1/2 justify-around">
        <div>User Score = {props.userScore}</div>
        <div>Round = {props.round}</div>
        <div>Bot Score = {props.botScore}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-around">
          <div>Stock = {props.stockName}</div>
          <div>
            Date: {props.date.getMonth()}/{props.date.getDate()}/
            {props.date.getFullYear()}
          </div>
        </div>
        <div className="w-full flex flex-row justify-center">
          {props.headline}
        </div>
        <div className="flex flex-row justify-center">
          {props.isUp ? "Up" : "Down"}
        </div>
      </div>
    </div>
  );
}
