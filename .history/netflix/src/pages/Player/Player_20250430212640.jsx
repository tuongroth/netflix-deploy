import React, { useState, useEffect } from 'react';

const Player = () => {
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  // Example fetch (replace with real API and dynamic video ID)
  useEffect(() => {
    // Simulated API call
    const fetchData = async () => {
      // Replace with actual fetch
      const data = {
        name: "Sample Video",
        key: "hkHHwA-vEyQ",
        published_at: "2024-12-01",
        type: "Trailer"
      };
      setApiData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="player">
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title={apiData.name}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>Published: {apiData.published_at}</p>
        <p>Name: {apiData.name}</p>
        <p>Type: {apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
