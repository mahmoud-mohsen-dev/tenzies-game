import { useEffect, useState } from "react"
import Confetti from "react-confetti";
import Die from "./Die"
import {nanoid} from 'nanoid'

function App() {
  const [Dice, setDice] = useState(initialAllDices);
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = Dice.every(item => item.held)
    const allTheSameNumber = Dice.every((item) => Dice[0].number === item.number);
    if (allHeld && allTheSameNumber){
      setTenzies(true)
    }
  }, [Dice])

  function randomDiceNum(){
    return Math.ceil(Math.random() * 6)
  }

  function holdDice(clickedItemId){
    setDice( prevDice => {
      return prevDice.map((item) => {
        return item.id === clickedItemId ? { ...item, held: !item.held } : item;
      });
    })

  }
  // console.log(Dice);

  function initialAllDices(){
    let arr = []
    for (let i = 0; i < 10; i++){
      arr.push({
        held: false,
        number: randomDiceNum(),
        id: nanoid()
      });
    }
    return arr
  }


  function rollUnheldDice(){
    if (!tenzies){
      const tempArr = initialAllDices();
      for (let i = 0; i < 10; i++) {
        if (Dice[i].held) {
          tempArr[i] = Dice[i];
        }
      }
      setDice(tempArr);
    } else {
      setDice(initialAllDices())
      setTenzies(false)
    }

  }

  const DiceElements = Dice.map(item => {
    return <Die Dice={item} hold={holdDice} key={item.id}/>;
  })
  // console.log(DiceElements)

  return (
    <div className="tenzies">
        {tenzies && <Confetti />}
        <div className="tenzies__box">
            <h2>Tenzies</h2>
            <p>
              Roll until all dice are the same. Click each die to freeze it at its
              current value between rolls.
            </p>
            <div className="tenzies__numbers">
              {DiceElements}
            </div>
            <button type="button" onClick={rollUnheldDice}>
              {tenzies ? 'Resest Game' : 'Roll'}
            </button>
        </div>
    </div>
  )
}

export default App
