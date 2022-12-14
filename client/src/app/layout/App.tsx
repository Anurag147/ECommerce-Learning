import React, { useState, useEffect } from 'react';
import './App.css';
import Catalog from '../../features/catalog/Catalog';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './Header';
import { CssBaseline,Container,createTheme,ThemeProvider } from '@mui/material';
import { Route } from 'react-router-dom';
import Home from '../../features/home/Home';
import ProductDetails from '../../features/catalog/ProductDetails';
import About from '../../features/about/About';
import Contact from '../../features/contact/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from '../../features/basket/BasketPage';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import { CheckoutPage } from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/store';
import { getBasketAsync, setBasket } from '../../features/basket/BasketSlice';
import { Login } from '../../features/account/Login';
import { Register } from '../../features/account/Register';

function App() {

  const [mode,setMode] = useState(false);
  const dispatch = useAppDispatch();


  useEffect(()=>{
      const buyerId = getCookie('buyerId');
      console.log(buyerId);
      if(buyerId){
        dispatch(getBasketAsync());
      }
  },[]);

  const toggle = () => {
    setMode(!mode)
  }
  
  const theme = createTheme({
    palette:{
      mode:mode?'dark':'light'
    }
  });

  return (
   <> 
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
        <CssBaseline/>
        <Header toggle={toggle}/>
        <Container>
          <Route path='/' exact component={Home}/>
          <Route path='/catalog' exact component={Catalog}/>
          <Route path='/catalog/:id' component={ProductDetails}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/basket' component={BasketPage}/>
          <Route path='/checkout' component={CheckoutPage}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
