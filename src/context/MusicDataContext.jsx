// MusicDataContext.js
import React, { createContext, useState } from "react";

const initialState = {
  id: "",
  title: "",
  subtitle: "",
  coverarthq: "",
  updateMusicData: (data) => {},
};

const MusicDataContext = createContext(initialState);

const MusicDataProvider = ({ children }) => {
  const [musicData, setMusicData] = useState(initialState);

  const updateMusicData = (data) => {
    setMusicData(data);
  };

  return (
    <MusicDataContext.Provider value={{ musicData, updateMusicData }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export { MusicDataContext, MusicDataProvider };