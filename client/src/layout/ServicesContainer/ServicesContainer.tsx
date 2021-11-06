import React, { useState, useEffect } from 'react';
import { Heading, Box, Grid, Button, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Service from '../../components/Service/Service';
import { fetchServices } from './servicesSlice';

interface ServiceType {
  serviceId: number;
  name: string;
  serviceIconUrl: string;
}
const ServicesContainer = () => {
  const services = useAppSelector((state) => state.services.data);
  const status = useAppSelector((state) => state.services.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadServices = async () => {
      await dispatch(fetchServices());
    };
    loadServices();
  }, [dispatch]);

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  // Calculate the number of column to display depending on the screen size
  const increment = Math.floor(width / 128);
  const [len, setLen] = useState(0);
  const [display, setDisplay] = useState<ServiceType[]>([]);
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');

  const incLen = () => {
    setLen(len + increment > services.length ? services.length : len + increment);
  };

  /**
   * Fill the array that handle the display of Services
   */
  useEffect(() => {
    setDisplay([...services.slice(0, len)]);
  }, [len, services]);
  useEffect(() => {
    setLen(increment > services.length ? services.length : increment);
  }, [increment, services.length]);
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
      {len !== services.length && (
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
            More Services
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ServicesContainer;
