import React, { useEffect, useState } from "react";
import '../styles/components-css/audio-controls.css';
import '../styles/components-css/music-container.css';
import MusicContainer from "./music-container";

const AudioControls = ({ handleLeft, playSong, handleRight, setIsPlaying, isPlaying, currentSong, audioRef }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const updateTime = () => {
                if (!isDragging) {  // Only update time when not dragging
                    setCurrentTime(audioElement.currentTime);
                }
                setDuration(audioElement.duration);
            };
            audioElement.addEventListener('timeupdate', updateTime);
            audioElement.addEventListener('loadedmetadata', updateTime);
            return () => {
                audioElement.removeEventListener('timeupdate', updateTime);
                audioElement.removeEventListener('loadedmetadata', updateTime);
            };
        }
    }, [audioRef, isDragging]);

    const handleProgressBarInteraction = (e) => {
        const progressBar = e.target;
        const totalWidth = progressBar.offsetWidth;
        let clientX;

        // Handle both mouse and touch events
        if (e.type.startsWith('touch')) {
            clientX = e.touches[0].clientX;  // Get the X coordinate for touch
        } else {
            clientX = e.clientX;  // Get the X coordinate for mouse
        }

        const clickX = clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickX / totalWidth) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        handleProgressBarInteraction(e);  // Set time after dragging is done
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleProgressBarInteraction(e);  // Update time as you drag
        }
    };

    const handleTouchStart = () => {
        setIsDragging(true);
    };

    const handleTouchEnd = (e) => {
        setIsDragging(false);
        handleProgressBarInteraction(e);  // Set time after dragging is done
    };

    const handleTouchMove = (e) => {
        if (isDragging) {
            handleProgressBarInteraction(e);  // Update time as you drag
        }
    };

    const remainingTime = duration ? duration - currentTime : 0;

    return (
        <div className="lower__container">
            <MusicContainer currentSong={currentSong} />
            {/* Progress Bar Section */}
            <div
                className="progress-container"
                onClick={handleProgressBarInteraction}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}  // Stop dragging if the mouse leaves the area
                onTouchStart={handleTouchStart}  // Touch start event for mobile
                onTouchMove={handleTouchMove}    // Touch move event for mobile
                onTouchEnd={handleTouchEnd}      // Touch end event for mobile
            >
                <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <div className="time-container">
                <span>{Math.floor(currentTime)}s</span>
                <span>{duration ? Math.floor(duration) : '0'}s</span>
            </div>
            <div className="timestamp-container">
                <p>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, '0')} /</p>
                <p>{Math.floor(remainingTime / 60)}:{(Math.floor(remainingTime) % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="audio-controls__container">
                <button className="audio-controls__prev" onClick={() => handleLeft()}>
                    <i className="fa solid fa-backward"></i>
                </button>
                {isPlaying ? (
                    <button onClick={() => setIsPlaying(false)} className="audio-controls__pause-play">
                        <i className="fa solid fa-pause"></i>
                    </button>
                ) : (
                    <button onClick={() => {
                        setIsPlaying(true);
                        playSong();
                    }} className="audio-controls__pause-play">
                        <i className="fa solid fa-play"></i>
                    </button>
                )}
                <button className="audio-controls__next" onClick={() => handleRight()}>
                    <i className="fa solid fa-forward"></i>
                </button>
            </div>
        </div>
    );
};

export default AudioControls;
