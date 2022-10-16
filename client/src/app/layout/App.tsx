import React, { useState } from 'react';
import './App.css';
import Catalog from '../../features/catalog/Catalog';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './Header';
import { CssBaseline,Container,createTheme,ThemeProvider } from '@mui/material';

function App() {

  const [mode,setMode] = useState(false);

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
        <CssBaseline/>
        <Header toggle={toggle}/>
        <Container>
          <Catalog/>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
