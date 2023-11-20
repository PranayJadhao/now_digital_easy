
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Pagination, CircularProgress } from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); 

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: page,
            _limit: postsPerPage,
          },
        });

        
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {loading && <CircularProgress />}
      <List>
        {posts.map(post => (
          <ListItem key={post.id} button component={Link} to={`/post/${post.id}`}>
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
      <Pagination count={10} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default PostList;
