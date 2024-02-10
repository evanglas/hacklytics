import UpDownButton from "./UpDownButton";
export default function UpDown(props) {
  return (
    <div className="flex flex-row justify-around">
      <UpDownButton text="Up" color="green" handleGuess={props.handleGuess} />
      <UpDownButton text="Down" color="red" handleGuess={props.handleGuess} />
    </div>
  );
}
