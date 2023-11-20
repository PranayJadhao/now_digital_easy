// src/components/SinglePost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleAddToFavorite = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!existingFavorites.find((favorite) => favorite.id === post.id)) {
      const updatedFavorites = [...existingFavorites, post];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    console.log('Added to favorites:', post.title);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      {imageLoaded ? null : <CircularProgress />} {/* Loader */}
      {imageError && <Typography color="error">Image failed to load.</Typography>} {/* Error message */}
      <img
        src={`https://source.unsplash.com/collection/928423/1280x720?random=${Math.random()}`}
        alt="Random Image"
        style={{ width: '100%', height: 'auto', display: imageLoaded ? 'block' : 'none' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <Typography variant="h4">{post.title}</Typography>

      <Button variant="outlined" onClick={handleAddToFavorite}>
       
        Add to Favorite
      </Button>

      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default SinglePost;
