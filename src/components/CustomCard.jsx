import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Navbar from "./Navbar";

const CustomCard = ({ imageUrl, title, subtitle }) => {

  const onclickHandler = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/createEntry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, subtitle, imageUrl })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <Navbar />
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          width: "100vw",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            width: "35vw",
            backgroundColor: "#fff",
            boxShadow: 3,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 280, border: 3, borderColor: "#000", p: 0.5 }}
              image={imageUrl}
              alt={title}
            />
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 5,
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: "Roboto Slab, serif" }} component="div" p="5px">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Roboto Slab, serif" }} color="text.secondary" p="5px">
              {subtitle}
            </Typography>
            <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5, fontFamily: "Roboto Slab, serif" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2E073F",
                  "&:hover": {
                    backgroundColor: "#2E073F",
                    color: "#393E46",
                  },
                  fontFamily: "Roboto Slab, serif",
                }}
                onClick={onclickHandler}
                size="large"
              >
                Add to Library
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default CustomCard;
