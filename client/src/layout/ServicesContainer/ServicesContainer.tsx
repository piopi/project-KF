import React, { useState, useEffect, useRef } from 'react';
import { Heading, Box, Grid, useBreakpointValue, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import Service from '../../components/Service/Service';

interface ServiceType {
  name: string;
  src: string;
}
const ServicesContainer = () => {
  const increment = useBreakpointValue({ base: 2, md: 6, lg: 8, xl: 11, '2xl': 15 }) || 0;
  const [len, setLen] = useState(0);
  const [display, setDisplay] = useState<ServiceType[]>([]);
  const services = useRef<ServiceType[]>([]);
  const btnBgColor = useColorModeValue('bg.100', 'gray.900');
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 30; i++) {
      services.current = [
        ...services.current,
        {
          name: 'Facebook',
          src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg',
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
      <Heading id="services" as="h1" fontSize="1.2rem">
        Recommended services
      </Heading>
      <Grid templateColumns="repeat(auto-fill,100px)" gap={6}>
        {display.map((elem) => (
          <Service name={elem.name} src={elem.src} />
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
            More Services
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ServicesContainer;
