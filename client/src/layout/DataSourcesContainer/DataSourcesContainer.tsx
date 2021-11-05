import React, { useState, useEffect, useRef } from 'react';
import { Heading, Box, Grid, useBreakpointValue, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import DataSource from '../../components/DataSource/DataSource';

interface ServiceType {
  name: string;
}
const DataSourcesContainer = () => {
  const increment = useBreakpointValue({ base: 1, md: 3, lg: 4, xl: 6, '2xl': 7 }) || 0;
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
          name: 'Retention Expansion Data',
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
      <Heading id="datasources" as="h1" fontSize="1.2rem">
        Existing Data Sources
      </Heading>
      <Grid templateColumns="repeat(auto-fill,220px)" gap={4}>
        {display.map((elem) => (
          <DataSource name={elem.name} />
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
            More Data sources
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default DataSourcesContainer;
