import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

function CardTable() {
  // Use the custom hook useAxios to manage the state, addCard, and
  // clearCards for the cards data.
  const [cards, addCard, clearCards] = useAxios(
    "cards", // state key for the cards data
    "https://deckofcardsapi.com/api/deck/new/draw/" // API endpoint to fetch the cards
  );
  
  // Return a JSX element that renders the list of playing cards.
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button 
          onClick={() => addCard(formatCard)} // onClick event handler to add a new card
        >
          Add a playing card!
        </button>
        <button onClick={clearCards}>Clear the table</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(card => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
