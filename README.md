# Tenzies

* [Overview](#overview)
* [Screenshots](#screenshots)
* [Tools Used](#tools-used)
* [Challenges](#challenges)
* [Code of Special Interest](#code-of-special-interest)
* [Stretch Goals](#stretch-goals)

## Overview
*Originally coded as part of Scrimba's Learn React course. One of two final capstone projects.*

A simple game of dice where the objective is to have all die faces showing the same value.
This can be acheived by holding dice with values you want to keep and rolling the others.

## Screenshots

![image](https://github.com/user-attachments/assets/a3591422-9698-4c3a-9f70-fe7a84cb9a3d)


![image](https://github.com/user-attachments/assets/05d74f66-048e-41a1-bc3e-fb60153a3f2d)

## Tools used:
React - JSX - JS - Vite

## Challenges:
*To employ useEffect and useRef
*To import confetti
*To consider accessibility

## Code of special interest

The first time I've come across aria-live. Such an exciting accessibility feature. When the game is won, players who may not be able to see the confetti animation are read our message by the screen reader.
```
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Hooray! You're a winner! Press "New Game" to play again.</p>}
            </div>
```

We were left with the challenge of updating an external DOM node when a local variable changed. Since we had touched on useEffect and useRef in the course it seemed logical to try them alone here!

One thing to note is that between every challenge Scrimba resets your code to match the tutor's so here you can see my could-be-clearer variable name rather than the one that ultimately ended up in my project code.

```
    const rollBtn = useRef(null);
        // if gameWon then set focus to Roll/NewGame button
        // Access external DOM node and call .focus()
        useEffect(() => {
            if ( gameWon ) { 
            rollBtn.current.focus()
            }
    }, [gameWon]);
```

In some cases we would need to add cleanup to the useEffect code but in this instance the .focus method doesn't create any side effects and doesn't persist.

Below you can see me assigning the reserved property ref to the button element.

```
<button ref={rollBtn} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
```

### Stretch Goals:
![Stretch](https://github.com/user-attachments/assets/ddc6668b-15a5-47d1-9584-2a2ee876b463)


Timer\
~~Roll Counter~~
