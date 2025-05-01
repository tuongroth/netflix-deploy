import React, { useState, useEffect, useRef } from 'react';
import './TitleCards.css';

const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]); // Khai báo useState để lưu dữ liệu từ API
  const cardsRef = useRef(); // Sử dụng useRef để tham chiếu DOM cho phần cuộn ngang

  // Hàm xử lý sự kiện cuộn chuột
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    // Cấu hình sự kiện cuộn chuột
    const refCurrent = cardsRef.current;
    refCurrent.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up sự kiện khi component unmount
    return () => {
      refCurrent.removeEventListener('wheel', handleWheel);
    };
  }, []); // Chỉ gọi một lần khi component mount

  useEffect(() => {
    // Fetch dữ liệu từ API khi component mount
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY', // Thay thế với key của bạn
      },
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.results); // Lưu dữ liệu trả về vào state apiData
      })
      .catch((err) => console.error('Error fetching data: ', err));
  }, []); // Chỉ fetch một lần khi component mount

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <div className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Hiển thị khi chưa có dữ liệu
        )}
      </div>
    </div>
  );
};

export default TitleCards;
