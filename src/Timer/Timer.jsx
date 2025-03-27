import PropTypes from 'prop-types';

Timer.propTypes = {
  timerElement: PropTypes.object,
  timer: PropTypes.number,
  fn: PropTypes.func.isRequired,
};

export default function Timer(props) {
  const handleClick = (event) => {
    event.target.disabled = true; // Disable the button immediately
    props.fn();
  };
  return (
    //Start timer button, text becomes the timer itself until the timer is reset
    //Add simple time formatting
    //disable button after timer started
    <button
      disabled={!!props.timer && 'disabled'} //The double exclamation marks (!!) are used to explicitly convert a value to a boolean
      onClick={handleClick}
      ref={props.timerElement}
      id={'timer'}
    >
      {props.timer > 0
        ? props.timer > 59
          ? `${Math.floor(props.timer / 60)}m ${props.timer % 60}s`
          : `${props.timer}s`
        : 'Start Timer'}
    </button>
  );
}
