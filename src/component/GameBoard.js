import { useEffect, useState } from "react";
import Data from "./Data";
import Card from "./Card";
import Modal from "./Modal";

function GameBoard() {
  const [cardsArray, setCardsArray] = useState([]);
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [won, setWon] = useState(0);
  const [stopFlip, setStopFlip] = useState(false);

  function NewGame() {
    setTimeout(() => {
      const randomOrderArray = Data.sort(() => 0.5 - Math.random());
      setCardsArray(randomOrderArray);
      setMoves(0);
      setFirstCard(null);
      setSecondCard(null);
      setWon(0);
    }, 1200);
  }

  function handleSelectedCards(item) {
    console.log(typeof item);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((preArray) => {
          return preArray.map((unit) => {
            if (unit.name === firstCard.name) {
              return { ...unit, matched: true };
            } else {
              return unit;
            }
          });
        });
        setWon((preVal) => preVal + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((preValue) => preValue + 1);
  }

  useEffect(() => {
    NewGame();
  }, []);
  const closeModalFunction = () => {
    NewGame();
  };
  return (
    <div className="container">
      <div className="header">
        <h1>Ansh Memory Game</h1>
      </div>
      <div className="board">
        {cardsArray.map((item) => (
          <Card
            item={item}
            key={item.id}
            handleSelectedCards={handleSelectedCards}
            toggled={
              item === firstCard || item === secondCard || item.matched === true
            }
            stopFlip={stopFlip}
          />
        ))}
      </div>
      {won !== 6 ? (
        <div className="comments">Moves:{moves} </div>
      ) : (
        <div className="comments">
          {" "}
          <Modal
            message={
              <>
                <p>Congratulations! You won in {moves} moves!</p>
                <p>
                  Please subscribe to{" "}
                  <a
                    href="https://www.youtube.com/@Teachoreal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ansh's YouTube channel
                  </a>
                  .
                </p>
              </>
            }
            onClose={NewGame}
          ></Modal>{" "}
        </div>
      )}
      <button className="button" onClick={NewGame}>
        New Game
      </button>
    </div>
  );
}

export default GameBoard;
