import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import DataSource from '../../components/DataSource/DataSource';
import { useAppSelector } from '../../store/store';
import { DataSource as DataSourceType } from './dataSourcesSlice';

const DataSourcesContainer = () => {
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');
  const services = useAppSelector((state) => state.services.data);
  const datasources = useAppSelector((state) => state.dataSources.data);
  const status = useAppSelector((state) => state.dataSources.status);
  const [width, setWidth] = useState(window.innerWidth);
  const [length, setLength] = useState(0);
  const [display, setDisplay] = useState<DataSourceType[]>([]);

  // Calculate the number of column to display depending on the screen size
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const increment = Math.floor(width / 255);

  /**
   * Fill the array that handle the display of services
   * It fill it incrementaly and depending of the screen size.
   */
  useEffect(() => {
    setDisplay([...datasources.slice(0, length)]);
  }, [length, datasources]);
  useEffect(() => {
    setLength(increment > datasources.length ? datasources.length : increment);
  }, [increment, datasources.length]);
  const increaseLength = () => {
    setLength(length + increment > services.length ? services.length : length + increment);
  };
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
      {display.length !== datasources.length && (
        <Flex alignItems="end" justifyContent="flex-end">
          <Button
            border="1px"
            borderColor="button.100"
            borderStyle="solid"
            color="button.100"
            fontWeight="700"
            fontSize={14}
            mr={5}
            onClick={() => increaseLength()}
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
