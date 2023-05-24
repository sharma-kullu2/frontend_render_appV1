import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function Main(props) {
  const { posts, title } = props;
  if (Array.isArray(posts)) {
    return (
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
        {posts.map((post) => (
          <Markdown className="markdown" key={post.description.toString().substring(0, 40)}>
            {post.description.toString()}
          </Markdown>
        ))}
      </Grid>
    );
  }
  else{
    return(
      <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
        <Markdown className="markdown" key={posts.description.toString().substring(0, 40)}>
          {posts.description.toString()}
        </Markdown>
    </Grid>
    
    );
  }
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
