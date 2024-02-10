import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

export default function UpDownButton(props) {
  return (
    <div
      className={`rounded-xl m-5 w-52 h-52 bg-${props.color}-500 hover:opacity-80 flex justify-center items-center border-black border-4`}
      onClick={() => {
        props.handleGuess(props.text);
        console.log(props.color);
      }}
    >
      {props.text == "Up" ? (
        <FontAwesomeIcon icon={faArrowTrendUp} size="6x" />
      ) : (
        <FontAwesomeIcon icon={faArrowTrendDown} size="6x" />
      )}
    </div>
  );
}
