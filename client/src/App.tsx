import React, { useEffect } from 'react';
import './App.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { fetchServices, Service } from './layout/ServicesContainer/servicesSlice';
import { fetchDataSource, DataSource } from './layout/DataSourcesContainer/dataSourcesSlice';
import { fetchVisualization } from './layout/VisualizationContainer/visualizationSlice';
import { useAppDispatch } from './store/store';
import NavBar from './layout/NavBar/NavBar';
import ServicesContainer from './layout/ServicesContainer/ServicesContainer';
import DataSourcesContainer from './layout/DataSourcesContainer/DataSourcesContainer';
import VisualizationContainer from './layout/VisualizationContainer/VisualizationContainer';

function App() {
  const dispatch = useAppDispatch();
  // Go Fetch from the API the data
  useEffect(() => {
    const loadData = async () => {
      const responseServices = await dispatch(fetchServices());
      if (responseServices) {
        const services = responseServices.payload as Service[];
        await Promise.all(
          services.map(async (service) => {
            const response = await dispatch(fetchDataSource(service.serviceId));
            if (response) {
              const dat = response.payload as DataSource[];
              await Promise.all(
                dat.map(async (dataSource) => {
                  await dispatch(fetchVisualization(dataSource.dataId));
                }),
              );
            }
          }),
        );
      }
    };
    loadData();
  }, [dispatch]);
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
        <NavBar />
      </Box>
      <VisualizationContainer />
      <ServicesContainer />
      <DataSourcesContainer />
    </>
  );
}

export default App;
