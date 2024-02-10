export default function UpDownButton(props) {
  return (
    <div
      className={`rounded-xl m-5 w-72 h-72 bg-${props.color}-500 hover:opacity-80 flex justify-center items-center border-black border-4`}
      onClick={() => props.handleGuess(props.text)}
    >
      {props.text}
    </div>
  );
}
