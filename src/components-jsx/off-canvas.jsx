import React from "react";
import '../styles/components-css/off-canvas.css';

const OffCanvas = ({ songs, playSong }) => {
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Songs List</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="songs__ul">
                    {songs.map(song => (
                        <li className="songs__li" key={song.id} onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
                            <button>
                                {song.name} {/* Adjust the property to display the song name */}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OffCanvas;
