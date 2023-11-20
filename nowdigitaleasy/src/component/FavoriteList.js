
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const FavoriteList = () => {
 
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return (
    <div>
      <Typography variant="h4">Favorite Posts</Typography>
      <ul>
      {favorites.map((favorite) => (
  <Link to={`/post/${favorite.id}`} key={favorite.id}>
    <li>{favorite.title}</li>
  </Link>
))}
      </ul>
    </div>
  );
};

export default FavoriteList;
