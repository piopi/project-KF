import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import { useAppSelector } from '../../store/store';
import Service from '../../components/Service/Service';
import { Service as ServiceType } from './servicesSlice';

const ServicesContainer = () => {
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');
  const services = useAppSelector((state) => state.services.data);
  const status = useAppSelector((state) => state.services.status);

  const [width, setWidth] = useState(window.innerWidth);
  const [length, setLength] = useState(0);
  const [display, setDisplay] = useState<ServiceType[]>([]);
  // Calculate the number of column to display depending on the screen size
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const increment = Math.floor(width / 128);

  /**
   * Fill the array that handle the display of services
   * It fill it incrementaly and depending of the screen size.
   */
  useEffect(() => {
    setDisplay([...services.slice(0, length)]);
  }, [length, services]);
  useEffect(() => {
    setLength(increment > services.length ? services.length : increment);
  }, [increment, services.length]);
  const increaseLength = () => {
    setLength(length + increment > services.length ? services.length : length + increment);
  };
  return (
    <Box mt="6rem" mx="20px">
      {status === 'idle' ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Heading id="services" as="h1" fontSize="1.2rem">
          Recommended services
        </Heading>
      )}
      <Grid templateColumns="repeat(auto-fill,100px)" gap={6}>
        {display.map((elem) => (
          <Service name={elem.name} src={elem.serviceIconUrl} />
        ))}
      </Grid>
      {display.length !== services.length && (
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
            More Services
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ServicesContainer;
