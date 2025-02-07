export default function Timer(props) {
  return (
    <button onClick={props.fn} ref={props.timerElement} id="timer">
      {props.timer > 0
        ? props.timer > 59
          ? `${Math.floor(props.timer / 60)}m ${props.timer % 60}s`
          : `${props.timer}s`
        : 'Start Timer'}
    </button>
  );
}


