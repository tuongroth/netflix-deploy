import React from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'; // Đảm bảo file này đúng

const TitleCards = () => {
  return (
    <div className='titlecards'>
      <h2>Popular on Netflix</h2>
      <div className="card-list">
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title || `card-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
