import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  const [data, setData] = React.useState(null);
  const [post, setposts] = React.useState([]);
  const [mainpost, setmainpost] = React.useState([]);
  const [featurepost, setfeaturepost] = React.useState([]);
  const [loading, setLoading] = React.useState(true); //conditional rendering

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT+'/get-posts')
      .then(response => {
        setData(response.data);
        setLoading(false);
        const PostList=response.data.post;
        const Post = PostList.map(post => {
          let updatedDescription = post.description.toString();
          if (Array.isArray(post.image)) {
              post.image.forEach((image) => {
                updatedDescription = updatedDescription.replace(image, process.env.REACT_APP_API_ENDPOINT + image);
              });
          }
          else{
              updatedDescription = updatedDescription.replace(response.data.post.image, process.env.REACT_APP_API_ENDPOINT+response.data.post.image);
          }
          return {
            description: updatedDescription,
            id:post.id,
            title: post.title, 
            image: process.env.REACT_APP_API_ENDPOINT+post.image ,
            imageText: 'main image description',
            linkText: 'Continue reading…',
          };
        });
        setposts(Post)
        const MainpostList = response.data.main;
        const Mainpost = MainpostList.map(post => {
          return {
            description: post.description,
            id:post.id,
            title: post.title, 
            image: process.env.REACT_APP_API_ENDPOINT+post.image ,
            imageText: 'main image description',
            linkText: 'Continue reading…',
          };
        });
        setmainpost(Mainpost[0]);
        const FeaturepostList = response.data.feature;
        const Featurepost = FeaturepostList.splice(0,2).map(post => {
        return {
            date:post.date,
            id:post.id,
            description: post.description,
            title: post.title, 
            image: process.env.REACT_APP_API_ENDPOINT+post.image ,
            imagelabel: 'main image description',
          };
        });
        setfeaturepost(Featurepost)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  console.log("---->data",data);;
  console.log("---->posts",post);
  console.log("---->org posts",posts);
  console.log("---->mainpost",mainpost);
  console.log("---->featuredpost",featurepost)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Engineering Insights: Your Digest to Biomedical and Analytical Instruments Operation and Maintenance" sections={sections} />
        <main>
          <MainFeaturedPost post={mainpost} />
          <Grid container spacing={4}>
            {featurepost.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={post} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
