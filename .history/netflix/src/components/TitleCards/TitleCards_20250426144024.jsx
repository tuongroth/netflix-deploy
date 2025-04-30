import React from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title }) => {
  return (
    <div className='titlecards'>
      <h2>{title}</h2>

      <div className="card-list">
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={`Card ${index}`} />
            <p>card.name</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
