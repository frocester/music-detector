
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E073F" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
          }}
        >
          Mujik Detector 🎵
        </Typography>
        <Box>
          <Button color="inherit" sx={{ color: "#fff",fontFamily: "'Montserrat', sans-serif" }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" sx={{ color: "#fff", fontFamily: "'Montserrat', sans-serif" }} onClick={() => navigate("/history")}>
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
