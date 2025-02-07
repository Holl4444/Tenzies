import { useState, useEffect, useRef } from 'react';
import Die from './Die/Die.jsx';
import Counter from './Counter/Counter.jsx';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [count, setCount] = useState(0);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const rollBtn = useRef(null);
  useEffect(() => {
    if (gameWon) {
      rollBtn.current.focus();
    }
    // if gameWon then set focus to Roll/NewGame button
    // Access external DOM node and call .focus()
  }, [gameWon]);

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
      setCount(count + 1);
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setCount(0);
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
      <div className="actions-div">
        <button
          ref={rollBtn}
          className="roll-dice"
          onClick={rollDice}
        >
          {gameWon ? 'New Game' : 'Roll'}
        </button>
        <Counter state={count} />
      </div>
    </main>
  );
}
