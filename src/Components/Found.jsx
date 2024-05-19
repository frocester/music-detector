import React, { useContext } from "react";
import { MusicDataContext } from "../context/MusicDataContext";

const Found = () => {

  console.log("Inside Found!");
  
const {musicData} = useContext(MusicDataContext);

console.log(musicData);
  return (
    <div>
      <div className="box">
        <div className="cover-img">
          <img src={musicData.coverarthq}></img>
        </div>
        <div className="song-name">
          <h2>{musicData.title}</h2>
        </div>
        <div className="singer-name">
          <h3>{musicData.subtitle}</h3>
        </div>
      </div>
      <div>Hello</div>
    </div>
  );
};

export default Found;
