import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

export default function UpDownButton(props) {
  return (
    <div
      className={`rounded-xl m-5 w-44 h-44 bg-${props.color}-500 hover:opacity-80 flex hover:cursor-pointer justify-center items-center shadow-2xl shadow-slate-400`}
      onClick={() => {
        props.handleGuess(props.text);
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
