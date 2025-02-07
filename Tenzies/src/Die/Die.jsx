export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#DF9547' : 'white',
  };

  return (
    <button
      className="die"
      style={styles}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? 'held' : 'not held'}`}
    >
      <svg width="50" height="50" viewBox="0 0 50 50">
        <use href={`/dice-faces.svg#face-${props.value}`} />
      </svg>
    </button>
  );
}
