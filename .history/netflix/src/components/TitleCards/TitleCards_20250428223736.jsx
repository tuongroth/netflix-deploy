import React, { useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();

  // Function to handle mouse wheel
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const refCurrent = cardsRef.current;
    refCurrent.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up the event listener
    return () => {
      refCurrent.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          return <div className="card" key={index}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
