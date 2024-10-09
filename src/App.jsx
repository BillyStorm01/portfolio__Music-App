import React, { useState, useEffect, useRef } from 'react';

//Style Imports
import './styles/modern-normalize.css';
import './styles/App.css';
import './styles/components-css/music-container.css'
import './styles/utils.css';

//Component Imports
import AudioControls from './components-jsx/audio-controls';

function App() {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const audioRef = useRef(null);
  const baseURL = "https://playground.4geeks.com";

  useEffect(() => {
    fetch(baseURL + "/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
        setCurrentSong(data.songs[0]);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  function playSong() {
    if (currentSong) {
      audioRef.current.src = baseURL + currentSong.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function handleLeft() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevSong = currentIndex === 0 ? songs[songs.length - 1] : songs[currentIndex - 1];
    setCurrentSong(prevSong);
    playSong(prevSong);
  }

  function handleRight() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextSong = currentIndex === songs.length - 1 ? songs[0] : songs[currentIndex + 1];
    setCurrentSong(nextSong);
    playSong(nextSong);
  }

  return (
    <>
      <div className='background'></div>
      <div className='app__container container'>
        <div className='music__container'>
          <img className="image__container" src="/applemusic.png" alt="Music Icon" />
          <AudioControls
            handleLeft={handleLeft}
            playSong={playSong}
            handleRight={handleRight}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            currentSong={currentSong}
            audioRef={audioRef} // Pass the audioRef here
          />
          <audio ref={audioRef}></audio>
        </div>
      </div>
    </>
  );
}

export default App;
