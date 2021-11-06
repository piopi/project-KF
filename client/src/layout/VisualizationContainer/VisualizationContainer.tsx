import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import Visualization from '../../components/Visualization/Visualization';
import { useAppSelector } from '../../store/store';

interface VisualizationType {
  dataEntryName: string;
  data: number[];
  dataCurrency: string;
}
const VisualizationContainer = () => {
  const datasources = useAppSelector((state) => state.dataSources.data);
  const visualizations = useAppSelector((state) => state.visualizations.data);
  const status = useAppSelector((state) => state.visualizations.status);
  useEffect(() => {}, [datasources]);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  // Calculate the number of column to display depending on the screen size
  const increment = Math.floor(width / 265);
  const [len, setLen] = useState(0);
  const [display, setDisplay] = useState<VisualizationType[]>([]);

  const btnBgColor = useColorModeValue('bg.100', 'gray.900');

  const incLen = () => {
    setLen(len + increment > visualizations.length ? visualizations.length : len + increment);
  };

  /**
   * Fill the array that handle the display of visualizations
   */
  useEffect(() => {
    setDisplay([...visualizations.slice(0, len)]);
  }, [len, visualizations]);
  useEffect(() => {
    setLen(increment > visualizations.length ? visualizations.length : increment);
  }, [increment, visualizations.length]);
  return (
    <Box mt="6rem" mx="20px">
      {status === 'idle' ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Heading id="visualizations" as="h1" fontSize="1.2rem">
          Existing Data Sources
        </Heading>
      )}
      <Grid templateColumns="repeat(auto-fill,220px)" gap={6}>
        {display.map((elem) => (
          <Visualization name={elem.dataEntryName} currency={elem.dataCurrency} data={elem.data} />
        ))}
      </Grid>

      {len !== visualizations.length && (
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
            More Visualizations
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default VisualizationContainer;
