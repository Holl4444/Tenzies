export default function Timer(props) {
  return (
    <button onClick={props.fn} ref={props.timerElement} id="timer">
      {props.timer > 0 ? props.timer : 'Start Timer'}
    </button>
  );
}
