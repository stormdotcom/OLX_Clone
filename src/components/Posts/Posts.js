import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@material-ui/core';
import './Posts.css'
import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { PostContext } from '../../store/PostContext';


export default function Posts() {
  const {firebase} = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const {setPostDetails} = useContext(PostContext)

    useEffect(() => {
      firebase
        .firestore()
        .collection("products")
        .get()
        .then((snapshot) => {
          const allPost = snapshot.docs.map((product) => {
            return {
              ...product.data(),
              id: product.id,
            };
          });
          setProducts(allPost);
        });
    }, []);

  return (
      <Container container className='main-container'  maxWidth='lg'>
        <Grid  className='based' justifyContent='space-between'>
        <Typography variant='h5' >Based on your last search</Typography>
         <Typography sx={{textDecoration:'underline'}}>View more</Typography>
        </Grid>
         
        <Grid className='rowPost'>
         
        <Grid className="row-posts" container  wrap="nowrap">
         
          
      {products.map(product => {
        return <Box className='row-container' justifyContent='center' sx={{ marginLeft: 2}}
        onClick = {()=>{
          setPostDetails(product)
          navigate('/view')
        }}
        >
           <Grid display='flex' justifyContent='center' >
          <Grid className='img-container' >
            <img 
              alt={product.name}
              src={product.url}
            />
            </Grid>
            <Grid className='fav-container' >
            <Grid className='fav-icon' >
            <FavoriteBorderIcon />
            </Grid>
            </Grid>
            </Grid>

           

          
            <Grid  justifyContent='flex-start' display='flex' >
            <Grid className='detials-box' >
              <Typography className='price' gutterBottom variant="body2">
              &#x20b9;{product.price}
              </Typography>
              <Typography className='category' display="block" variant="caption" color="text.secondary">
                {product.category}
              </Typography>
              <Typography className='name' display="block" variant="caption" color="text.secondary">
                {product.name}
              </Typography>
              <Grid className='date' >
              <Typography className='date' variant="caption" color="text.secondary">
               {product.createdAt}
              </Typography>
              </Grid>
            </Grid>
            </Grid>
        </Box>
      })}
    </Grid>
    </Grid>

    <Typography variant='h5' className='fresh'>Fresh recommendations</Typography>
    <Grid  className='main-posts'>
    <Grid  className="posts"  >
    {products.reverse().map(product => {
        return <Box className='box-container' sx={{ margin:1 }}
        onClick = {()=>{
          setPostDetails(product)
          navigate('/view')
        }}
        >
           <Grid className='post'>
             <Grid display='flex' justifyContent='center' >
             <Grid className='img-container' >
            <img
              alt={product.name}
              src={product.url}
            />
            </Grid >

            <Grid className='fav-container' >
            <Grid className='fav-icon' >
            <FavoriteBorderIcon />
            </Grid>
            </Grid>
            
            </Grid>

          <Grid justifyContent='flex-start' display='flex'>
            <Grid className='detials-box' >
              <Typography className='price' gutterBottom >
                &#x20b9;{product.price}
              </Typography>
              <Typography className='category' display="block" variant="caption" color="text.secondary">
                {product.category}
              </Typography>
              <Typography className='name' display="block" variant="caption" color="text.secondary">
                {product.name}
              </Typography>
              <Grid className='date' >
              <Typography className='date' variant="caption" color="text.secondary">
               {product.createdAt}
              </Typography>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
          
        </Box>
      })}
    </Grid>
    </Grid>
   
    </Container>
  );
}

