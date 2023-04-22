import "./SongListHeader.css";

const SongListHeader = () => {
    return (
        <div className="song-item header">
            <div className="index">#</div>
            <div className="name">Title</div>
            <div className="author">Artist</div>
            <div className="selector">
                {/* <i className="fas fa-chevron-down"></i> */}
                Add to playlist
            </div>
        </div>
    );
};

export default SongListHeader;
