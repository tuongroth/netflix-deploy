import React, { useRef, useEffect } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title }) => {
  const cardsRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="cards-container" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.title} />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

