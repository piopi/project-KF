import React, { useState, useEffect, useRef } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import Visualization from '../../components/Visualization/Visualization';

interface ServiceType {
  name: string;
}
const VisualizationContainer = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const increment = Math.floor(width / 255);
  const [len, setLen] = useState(0);
  const [display, setDisplay] = useState<ServiceType[]>([]);
  const services = useRef<ServiceType[]>([]);
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 15; i++) {
      services.current = [
        ...services.current,
        {
          name: 'MRr',
        },
      ];
    }
  }, []);
  const incLen = () => {
    setLen(len + increment > services.current.length ? services.current.length : len + increment);
  };

  /**
   * Fill the array that handle the display of Services
   */
  // const fillDisplay = () => {};
  useEffect(() => {
    setDisplay([...services.current.slice(0, len)]);
  }, [len]);
  useEffect(() => {
    setLen(increment > services.current.length ? services.current.length : increment);
  }, [increment]);
  return (
    <Box mt="6rem" mx="20px">
      <Heading id="visualizations" as="h1" fontSize="1.2rem">
        Existing Data Sources
      </Heading>
      <Grid templateColumns="repeat(auto-fill,220px)" gap={4}>
        {display.map((elem) => (
          <Visualization
            name={elem.name}
            currency="$"
            data={[323.99, 363.04, 382.44, 33.57, 437.85, 162.62, 125, 600, 450]}
          />
        ))}
      </Grid>
      {len !== services.current.length && (
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
