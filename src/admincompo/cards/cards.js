import React from "react";
import "../cards/cards.css";

const Cards = [
  {
    name: "summory",
    total: 21,
    description: "duetasks",
    footer: "Completed: 12",
  },
];

const Card = () => {
  return (
    <div className="cards">
      {Cards.map((card) => (
        <label key={card.name} id={card.name}>
          <input type="checkbox" />
          <div className="card">
            <div className="front">
              <header>
                <h2>{card.name}</h2>
              </header>
              <var>{card.total}</var>
              <h3>{card.description}</h3>
              <h4>{card.footer}</h4>
            </div>
            <div className="back">
              <header>
                <h2>{card.name}</h2>
              </header>
            </div>
            <p>More Information</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Card;
