import React, { useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = () => {
  const cardsRef = useRef();
  
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

  return (
    <div className='title-cards'>
      <h2>Popular on Netflix</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
