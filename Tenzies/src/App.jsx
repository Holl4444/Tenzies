import { useState, useEffect, useRef } from 'react';
import Die from './Die/Die.jsx';
import Counter from './Counter/Counter.jsx';
import Timer from './Timer/Timer.jsx';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  //Start timer button, text becomes the timer itself until the timer is reset

  const rollBtn = useRef(null);
  useEffect(() => {
    if (gameWon) {
      // if gameWon then set focus to Roll/NewGame button
      // Access external DOM node and call .focus()
      //stop the timer
      rollBtn.current.focus();
      endTimer();
    }
  }, [gameWon]);

  const timerElement = useRef(null);
  const setTimer = () => {
    //set timer interval to count seconds within the timer element.
    timerElement.current = setInterval(() => {
      setSeconds((prevSecs) => prevSecs + 1);
      if (seconds > 1799) {
        endTimer();
        alert('timed out');
      }
    }, 1000);
  };

  //Need to call if game over or timer exceeds 1800 seconds (30mins)
  const endTimer = () => {
    // Stop and tidy up the setinterval function but keep showing value
    clearInterval(timerElement.current);
  };

  const resetTimer = () => {
    // Reset the timer on screen and the state.
    timerElement.current = 0;
    setSeconds(0);
  };
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      // value: Math.ceil(Math.random() * 6),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setCount((prevCount) => prevCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setCount(0);
      resetTimer();
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>
            Congratulations! You won! Press "New Game" to start again.
          </p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it
        at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button ref={rollBtn} className="roll-dice" onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
      <div className="actions-div">
        <Timer
          timerElement={timerElement}
          timer={seconds}
          fn={setTimer}
        />
        <Counter state={count} />
      </div>
    </main>
  );
}
