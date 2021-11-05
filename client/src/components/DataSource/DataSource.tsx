import React from 'react';
import { Image, Flex, useColorModeValue, Link, Text } from '@chakra-ui/react';

interface Props {
  name: string;
}

const DataSource = ({ name }: Props) => (
  <Flex my={5} w="fit-content">
    <Link href="#datasources" title={name}>
      <Flex
        sx={{ boxShadow: ' 0 0 8px #ccc' }}
        bg={useColorModeValue('white', 'gray.700')}
        height="90px"
        width="220px"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Text
          position="absolute"
          zIndex="5"
          w="210px"
          h="50px"
          lineHeight="1"
          noOfLines={3}
          top="2"
          left="2"
          fontWeight="500"
          fontSize="1.1rem"
        >
          {name}
        </Text>
        <Image height="75%" opacity="0.4" src="/assets/dataSource.svg" />
      </Flex>
    </Link>
  </Flex>
);
export default DataSource;
