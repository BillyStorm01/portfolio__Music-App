import React from 'react';
import '../styles/components-css/music-container.css';

const MusicContainer = ({ currentSong }) => {
    return (
        <div className='music__container-CS'>
            {currentSong ? (
                <p>{currentSong.name}</p>   
            ) : (
                <p>No song is playing</p>
            )}
        </div>
    );
};

export default MusicContainer;