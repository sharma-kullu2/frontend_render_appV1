import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
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

const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?blog/',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?blog/',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?blog/',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?blog/',
      imageLabel: 'Image Text',
    }
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

export default function Nav(){
    const location = useLocation();
    const customProp = location.state;
    console.log("-->customProp->id= ",customProp.id);

    const [post, setposts] = React.useState([]);
    //const [mainpost, setmainpost] = React.useState([]);
    //const [featurepost, setfeaturepost] = React.useState([]);
    const [loading, setLoading] = React.useState(true); //conditional rendering
    React.useEffect(() => {
      if(customProp.id !== undefined){
        axios.get(process.env.REACT_APP_API_ENDPOINT+'/get-posts?id='+customProp.id)
          .then(response => {
            //setData(response.data);
            setLoading(false);
            // Replace the image paths with the desired URL pattern in post.description
            let updatedDescription = response.data.post.description.toString();

            if (Array.isArray(response.data.post.image)) {
              response.data.post.image.forEach((image) => {
                updatedDescription = updatedDescription.replace(image, process.env.REACT_APP_API_ENDPOINT + image);
              });
            }
            else{
              updatedDescription = updatedDescription.replace(response.data.post.image, process.env.REACT_APP_API_ENDPOINT+response.data.post.image);
            }
            const PostList=response.data.post;
            setposts({
                description: updatedDescription,
                id:PostList.id,
                title: PostList.title, 
                image: process.env.REACT_APP_API_ENDPOINT+PostList.image ,
                imageText: 'main image description',
                linkText: 'Continue reading…',
              })
            /*const MainpostList = response.data.main;
            const Mainpost = MainpostList.map(post => {
              return {
                description: post.description,
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
                description: post.description,
                title: post.title, 
                image: process.env.REACT_APP_API_ENDPOINT+post.image ,
                imagelabel: 'main image description',
              };
            });
            setfeaturepost(Featurepost)*/
          })
          .catch(error => {
            console.error(error);
          });
        }
    }, [customProp.id]);/*By including [customProp.id] as a dependency 
                        in the useEffect dependency array, 
                        the effect will only re-run if the id prop changes. 
                        If id is undefined initially and then becomes defined later, 
                        the effect will trigger again*/

    //console.log("--->Post= ",post.description);
    if(loading){
      return(
        <div>
          Loading....
        </div>
      );
    }
    else{
      return (
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container maxWidth="lg">
              <Header title="Engineering Insights: Your Digest to Biomedical and Analytical Instruments Operation and Maintenance" sections={sections} />
              <main>
              <Main title="From the firehose" posts={post} />
              <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
              </Grid>
              <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
                  />
              </main> 
              </Container>
              <Footer
                  title="Footer"
                  description="Something here to give the footer a purpose!"
              />
          </ThemeProvider>
      )
    }
}