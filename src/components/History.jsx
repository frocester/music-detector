import React, { useEffect, useState } from 'react';
import HistoryCard from './HistoryCard';
import { Box, Grid } from '@mui/material';
import Navbar from './Navbar';

const History = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/fetchFive`);
        const data = await response.json();
        setSongs(data.data); 
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: "100vh",
          width: '100vw',
          boxShadow: 5,
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {songs.map((song, index) => (
            <Grid item xs={12} key={index}>
              <HistoryCard
                imageUrl={song.imageUrl} 
                title={song.title}
                subtitle={song.subtitle}
                dateCreated={song.dateCreated}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default History;
