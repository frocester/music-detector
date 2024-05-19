import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MusicDataContext } from "../context/MusicDataContext";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL;
const Home = () => {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const { updateMusicData } = useContext(MusicDataContext);
  const audioChunk = [];
  const startButton = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start(4000);
    setTimeout(() => {
      mediaRecorder.stop();
    }, 4000);

    mediaRecorder.ondataavailable = (myData) => {
      //if data is present , save the data
      audioChunk.push(myData.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunk, { type: "audio/webm" });
      // const audioUrl = URL.createObjectURL(audioBlob);
      // setUrl(audioUrl);

      console.log(audioBlob);
      sendBlob(audioBlob);
    };

    const sendBlob = async (audioBlob) => {
      audioBlob = audioBlob.slice(0, audioBlob.size, "audio/wav");
      // const myFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
      const data = new FormData();
      data.append("audio", audioBlob, "audioBlob.wav");

      // const options = {
      //   method: "POST",
      //   url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "143933a9ddmsh861564847fe40c9p13f7b6jsn40cfbaa82068",
      //     "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
      //   },
      //   data: data,
      // };

      const options = {
        method: "POST",
        url: "https://shazam-core7.p.rapidapi.com/songs/recognize-song",
        headers: {
          "X-RapidAPI-Key":
            "143933a9ddmsh861564847fe40c9p13f7b6jsn40cfbaa82068",
          "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com",
        },
        data: data,
      };

      try {
        const response = await axios.request(options);
        const { status } = response.data;
        // console.log(status);
        if (status !== false) {
          //only if song is found then update var
          console.log(response.data);
          console.log(response.status);
          const { track, matches } = response.data;
          const { id } = matches[0];
          const { title, subtitle } = track;
          const {
            images: { coverarthq },
          } = track;

          console.log(id, title, subtitle, coverarthq);
          updateMusicData({
            id: id,
            title: title,
            subtitle: subtitle,
            coverarturl: coverarthq,
          });
          sendToDB({ id, title, subtitle, coverarthq });
          //if music is found and success
          navigate("/found");
        } else console.log("Music Not Found");
      } catch (error) {
        console.error(error);
      }
      setRecording(false);
    };
  };

  const sendToDB = async ({ id, title, subtitle, coverarthq }) => {
    const response = await axios.post(`${API_URL}/api/v1/createMusic`, {
      id,
      title,
      subtitle,
      coverarthq,
    });
    console.log(response.data);
  };

  const stopButton = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Tap to start recording...</h2>
      {!recording ? (
        <button onClick={startButton}>Start Listening</button>
      ) : (
        <button onClick={stopButton}>Listening...</button>
      )}
    </div>
  );
};

export default Home;
