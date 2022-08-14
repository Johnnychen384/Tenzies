import React from "react"
import './App.css';
import Dice from "./Dice"
import { nanoid } from 'nanoid'


function App() {

  // function creates an array and pushes 10 random numbers into it.
  const random = () => {
    const numArr = [];

    for(let i = 0; i < 10; i++){
      numArr.push({
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
        isHeld: false
      });
    };

    return numArr;
  };

  // creates a newDice Object
  const newDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  };


  // function set to roll button
  // when clicked calls random function to create new array to set to dice state.
  function roll(){
    if(youWon){
      setDice(random());
      setYouWon(false);
      setClicks(0);
      setWonGame(false);
    } else {
      setDice(prevState => {
        return prevState.map(die => {
          return die.isHeld ? die : newDice()
        })
      });
      setClicks(prev => prev + 1);
    };
    

  };



  // creates new array to set dice state too
  // depending on element clicked, we take their id
  // and change that specific objects isHeld property to opposite
  // and setting it into new array while keeping all not clicked elements
  // objects the same.
  function toggle(id){
    setDice(prevState => {

      // loops through previous state(dice)
      // creates new array. The elements passed into new array
      // is determined by condition.
      // if the element we are currently looping on has an ID
      // equal to the id paramenter which is retrieved from Dice.js
      // this id para is equal to the dice we click.
      return prevState.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} :
        die
      });
    });
  };


  // creates a state called dice storing an array
  const [dice, setDice] = React.useState(random());

  // creates state to check if player won
  const [youWon, setYouWon] = React.useState(false);

  // creates state to hold number of rolls
  const [clicks, setClicks] = React.useState(0);

  // creates states to check if dice array contains all green boxs and same values
  // if so this state will make whats stored in localstorage show up.
  const [wonGame, setWonGame] = React.useState(false);


  // loops through dice and with each element, a component is called
  // passing props to each element.
  const dices = dice.map(die => <Dice 
    key={die.id} 
    value={die.value} 
    handler={toggle} 
    id={die.id} 
    isHeld={die.isHeld}
  />);


  // if any changes happen in dice state this useEffect hook is triggered.
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true);
    const sameValue = dice.every(die => die.value === dice[0].value);
    if(allHeld && sameValue){
      setYouWon(true);
      localStorage.setItem("rolls", JSON.stringify(clicks));
      setWonGame(true);
    };

  }, [dice]);



  return (
    <div className='tenziesContainer'>
      <h1>Tenzies</h1>;
      {!youWon ? <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> : <h2>You Won! Rolls to win this round : {clicks}</h2>};
      {wonGame && <h2>Last games rolls to win : {JSON.parse(localStorage.getItem("rolls"))}</h2>}
      <main>
        {dices};
      </main>;
      <button onClick={roll}>{youWon ? "New Game" : "Roll"}</button>;
    </div>
  )
};

export default App;
