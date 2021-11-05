import React from 'react';
import './App.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
import NavBar from './layout/NavBar/NavBar';
import ServicesContainer from './layout/ServicesContainer/ServicesContainer';
import DataSoucesContainer from './layout/DataSourcesContainer/DataSourcesContainer';
import VisualizationContainer from './layout/VisualizationContainer/VisualizationContainer';

function App() {
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
        <NavBar />
      </Box>
      <VisualizationContainer />
      <ServicesContainer />
      <DataSoucesContainer />
    </>
  );
}

export default App;
