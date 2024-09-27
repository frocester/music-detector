import { Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

const NotFound = () => {
  return (
    <>
    <Navbar/>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
        width: "100vw",
      }}
    >
       <Typography
          variant="h3" // Larger text for the "Not Found" message
          sx={{
            fontFamily: "'Roboto Slab', serif", 
            fontWeight: "bold",
            textAlign: "center",
            color: "#2E073F", // Dark purple color for text
          }}
        >
          Music Not Found 😕
        </Typography>
    </Box>
    </>
  );
};

export default NotFound;
