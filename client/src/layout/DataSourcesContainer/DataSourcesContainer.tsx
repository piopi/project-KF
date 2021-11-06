import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import DataSource from '../../components/DataSource/DataSource';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchDataSource } from './dataSourcesSlice';
import { fetchVisualization } from '../VisualizationContainer/visualizationSlice';

interface DataSourceType {
  dataId: number;
  dataName: string;
  dataCurrency: string;
}
const DataSourcesContainer = () => {
  const services = useAppSelector((state) => state.services.data);
  const datasources = useAppSelector((state) => state.dataSources.data);
  const status = useAppSelector((state) => state.dataSources.status);
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const loadDataSource = async (id: number) => {
      const response = await dispatch(fetchDataSource(id));
      if (response) {
        const dat = response.payload as DataSourceType[];
        await Promise.all(
          dat.map(async (dataSource) => {
            await dispatch(fetchVisualization(dataSource.dataId));
          }),
        );
      }
    };
    if (services.length) {
      services.forEach((service) => loadDataSource(service.serviceId));
    }
  }, [dispatch, services]);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  // Calculate the number of column to display depending on the screen size
  const increment = Math.floor(width / 255);
  const [len, setLen] = useState(0);
  const [display, setDisplay] = useState<DataSourceType[]>([]);

  const btnBgColor = useColorModeValue('bg.100', 'gray.900');

  const incLen = () => {
    setLen(len + increment > datasources.length ? datasources.length : len + increment);
  };

  /**
   * Fill the array that handle the display of datasources
   */
  // const fillDisplay = () => {};
  useEffect(() => {
    setDisplay([...datasources.slice(0, len)]);
  }, [datasources, len]);
  useEffect(() => {
    setLen(increment > datasources.length ? datasources.length : increment);
  }, [datasources.length, increment]);
  return (
    <Box mt="6rem" mx="20px">
      {status === 'idle' ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Heading id="datasources" as="h1" fontSize="1.2rem">
          Existing Data Sources
        </Heading>
      )}
      <Grid templateColumns="repeat(auto-fill,220px)" gap={4}>
        {display.map((elem) => (
          <DataSource name={elem.dataName} />
        ))}
      </Grid>
      {len !== datasources.length && (
        <Flex alignItems="end" justifyContent="flex-end">
          <Button
            border="1px"
            borderColor="button.100"
            borderStyle="solid"
            color="button.100"
            fontWeight="700"
            fontSize={14}
            mr={5}
            onClick={() => incLen()}
            mt={4}
            bg={btnBgColor}
          >
            More Data sources
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default DataSourcesContainer;
