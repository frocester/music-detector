import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const SongCard = ({ imageUrl, title, subtitle, dateCreated }) => {
  return (
    <Card
    sx={{
      width: '537.6px', 
      height: '200px',  
      margin: '9px auto', 
      borderRadius: 2,
      boxShadow: 3, 
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s", // Smooth transition for scaling and shadow
      // filter: "blur(0.5px)",
      "&:hover": {
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)", // Glow effect
        transform: "scale(1.05)", // Slightly enlarge the card
        filter: "drop-shadow(10px 10px 20px #2E073F)",
      },
    }}
  >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)", // Add a slight overlay for better text visibility
        }}
      ></Box>
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          color: "#fff",
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="inherit">
          {subtitle}
        </Typography>
        <Typography variant="caption" color="inherit">
          Last Searched:{formatDate(dateCreated)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SongCard;
