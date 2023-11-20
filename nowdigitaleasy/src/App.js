
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SinglePost from './component/SinglePost';
import PostList from './component/PostList';
import FavoriteList from './component/FavoriteList';

const App = () => {
 
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log(favorites)
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"><Link to="/">Blog App</Link></Typography>
            <IconButton color="inherit" component={Link} to="/favorites">
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/"  element={<PostList/>} />
          <Route path="/post/:postId" element={<SinglePost/>} />
          <Route path="/favorites" element={<FavoriteList/>} />
        </Routes>
      </div>
    </Router>
   
  );
};

export default App;
