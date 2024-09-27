import { Box, Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// const API_URL = import.meta.env.VITE_API_URL;
const Main = () => {
  const [recording, setRecording] = useState(false);
  const navigate = useNavigate();
  let audioChunks = [];

  const startButton = async () => {
    setRecording(true);
    audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // mic permisiion
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 128000,
    }); //had to explicitly define mimeType so I can get clear audio

    mediaRecorder.start(6000);
    console.log("Stream Started");
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" }); //creating audioblob to send to server
      console.log("Blob created");
      console.log(audioBlob);
      sendBlob(audioBlob);
    };

    setTimeout(() => {
      mediaRecorder.stop();
    }, 6000);

    // console.log("Blob created");

    const sendBlob = async (audioBlob) => {
      console.log("Send Blob Called");
      var data = new FormData();
      data.append("audio", audioBlob, "recording.wav");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/upload`, {
        method: "POST",
        body: data,
      });

      setRecording(false);

      console.log("Printing Response");
      // console.log(response);
      const musicData = await response.json();
      if (musicData.message === "Music not found") {
        console.log("Music not found , please try again");
        navigate("/notfound");
      } else {
        const { title, subtitle, background } = musicData;
        navigate("/found", {
          state: { title, subtitle, imageUrl: background },
        });
      }
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button
          onClick={startButton}
          variant="contained"
          sx={{
            borderRadius: "50%",
            width: 150,
            height: 150,
            bgcolor: recording ? "#2E073F" : "#EBD3F8",
            color: recording ? "#fff" : "#000",
            animation: recording
              ? "pulse 1s infinite" // Pulsing when recording is true
              : "breathing 2s ease-in-out infinite", // Breathing when recording is false
            "&:hover": {
              backgroundColor: "#2E073F", // Darker color on hover
              color: "#fff",
              outline: "1.5px solid #fff", // White outline on hover
            },
            "@keyframes breathing": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.1)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
            "@keyframes pulse": {
              "0%": {
                transform: "scale(0.9)",
              },
              "50%": {
                transform: "scale(1)",
                boxShadow: "0 0 0 50px rgba(46, 7, 63, 0)", // Pulsing shadow
              },
              "75%": {
                transform: "scale(1)",
                boxShadow: "0 0 0 75px rgba(46, 7, 63, 0)", // Pulsing shadow
              },
              "100%": {
                transform: "scale(0.9)", // Shrink back
                boxShadow: "0 0 0 0 rgba(46, 7, 63, 0)", // Reset shadow
              },
            },
          }}
        >
          {recording ? "Listening" : "Start Listening"}
        </Button>
      </Container>
    </Box>
  );
};

export default Main;
