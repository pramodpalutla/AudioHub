import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Player from "./Player";
import SongList from "./SongList";
import SongDetail from "./SongDetail";
import SongListHeader from "./SongListHeader";
import withAuth from "./withAuth";

const AudioPlayerScreen = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get("http://localhost:8000/songs");
      const songsData = response.data;
      for (let i = 0; i < songsData.length; i++) {
        songsData[i].id = i;
      }
      console.log(songsData)
      setSongs(songsData);
    };
    fetchSongs();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <SongListHeader />
      <SongDetail />
      <SongList songs={songs} />
      <Player />
      <a href="#focused" id="focus-link" hidden>
        Go to playing element
      </a>
    </React.Fragment>
  );
};

export default withAuth(AudioPlayerScreen);
