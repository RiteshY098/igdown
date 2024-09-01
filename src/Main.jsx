import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Main = () => {
  const [link, setLink] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    const shortcode = link.split('/').filter(Boolean).pop(); // Extract shortcode from the link

    const options = {
      method: 'GET',
      url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/reel/',
      params: { shortcode },
      headers: {
        'x-rapidapi-key': '7e5ab0cf30msh896fe99daaf433cp184580jsn21e742af67d8',
        'x-rapidapi-host': 'instagram-scraper-2022.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setVideoData(response.data);
      setError('');
    } catch (error) {
      setError('Failed to download video. Please check the link and try again.');
      setVideoData(null);
    }
  };

  const downloadVideo = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Instagram Video Downloader
        </Typography>
        <TextField
          label="Instagram Video Link"
          variant="outlined"
          fullWidth
          value={link}
          onChange={(e) => setLink(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {videoData && (
          <Box mt={4}>
            <Typography variant="h6">Video Data:</Typography>
            <pre>{JSON.stringify(videoData, null, 2)}</pre>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => downloadVideo(videoData.video_url)}
            >
              Download Video
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Main;
