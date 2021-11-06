import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import Visualization from '../../components/Visualization/Visualization';
import { useAppSelector } from '../../store/store';
import { Visualization as VisualizationType } from './visualizationSlice';

const VisualizationContainer = () => {
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');
  const visualizations = useAppSelector((state) => state.visualizations.data);
  const status = useAppSelector((state) => state.visualizations.status);

  const [width, setWidth] = useState(window.innerWidth);
  const [length, setLength] = useState(0);
  const [display, setDisplay] = useState<VisualizationType[]>([]);

  // Calculate the number of column to display depending on the screen size
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const increment = Math.floor(width / 265);

  /**
   * Fill the array that handle the display of visualizations
   * It fill it incrementaly and depending of the screen size.
   */
  useEffect(() => {
    setDisplay([...visualizations.slice(0, length)]);
  }, [length, visualizations]);
  useEffect(() => {
    setLength(increment > visualizations.length ? visualizations.length : increment);
  }, [increment, visualizations.length]);
  const increaseLength = () => {
    setLength(length + increment > visualizations.length ? visualizations.length : length + increment);
  };

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

      {display.length !== visualizations.length && (
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
            More Visualizations
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default VisualizationContainer;
