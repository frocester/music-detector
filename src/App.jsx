import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Found from "./components/Found";
import { Box } from "@mui/material";
import NotFound from "./components/NotFound";
import History from "./components/History";

function App() {
  return (
    <Box sx={{bgcolor:"#EAD8B1"}}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/found" element={<Found />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Box>
  );
}

export default App;
