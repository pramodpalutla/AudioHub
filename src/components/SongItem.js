import { useState } from "react";
import "./SongItem.css";
import { connect, useDispatch } from "react-redux";
import { selectSong } from "../actions";
import axios from "axios";
import { toast } from 'react-toastify';

const SongItem = ({ song, index, selectSong, selectedSongId, playerState }) => {
    const [, setHovered] = useState(false);
    const dispatch = useDispatch();

    const selector = () => {
        // function addToPlaylist(id) {
        //     const token = localStorage.getItem('jwtToken');

        //     try {
        //         const response = axios.post('http://35.193.89.249:8000/addToPlaylist', {
        //             token: token,
        //             songId: id,
        //         });

        //         if (response.status === 200) {
        //             toast.success('Song added to playlist!');
        //             console.log('song added to playlist')
        //         }
        //         if (response.status === 400 || response.status === 401) {
        //             console.log('haha error')
        //         }

        //     } catch (error) {
        //         toast.error('Failed to add song to playlist!');
        //         if (error.response.status === 400) {
        //             //console.log(error.response.data.message)

        //             //   setError(error.response.data.message)
        //             return;
        //         }

        //     }
        // }


        function addToPlaylist(id) {
            const token = localStorage.getItem('jwtToken');
    
            return axios.post('http://35.193.89.249:8000/addToPlaylist', {
                token: token,
                songId: id,
            })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Song added to playlist')
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    console.log(error.response.data.message)
                }
                toast.error('Error adding song to playlist')
            });
        }
        return (
            <a
                draggable="false"
                onClick={() => addToPlaylist(song._id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19 11h-6V5c0-.55-.45-1-1-1s-1 .45-1 1v6H5c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1v-6h6c.55 0 1-.45 1-1s-.45-1-1-1z"
                    />
                </svg>
            </a>
        );
    };

    // Set song as active
    const now_selected = selectedSongId === song.id ? "active" : "";

    // set the gif
    const phaser = () => {
        if (selectedSongId === song.id && playerState) {
            return (
                <div className="index">
                    <img
                        alt=""
                        src="/playing.gif"
                        id="focused"
                        className="small-icon"
                    />
                </div>
            );
        } else {
            return <div className="index">{index + 1}</div>;
        }
    };
    return (
        <div
            className={`song-item`}
            id={now_selected}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
                selectSong(song);
                dispatch({ type: "PLAYER_STATE_SELECTED", payload: 1 });
            }}
        >
            {phaser()}
            <div className="name">{song.title}</div>
            <div className="author">{song.artist}</div>
            <div className="selector">{selector()}</div>


        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedSongId: state.selectedSongId,
        playerState: state.playerState,
    };
};

export default connect(mapStateToProps, { selectSong })(SongItem);
