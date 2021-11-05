import React from 'react';
import { Image, Flex, useColorModeValue, Link, Text } from '@chakra-ui/react';

interface Props {
  name: string;
  src: string;
}

const Service = ({ name, src }: Props) => (
  <Flex w="fit-content" flexWrap="nowrap" alignItems="center" justifyContent="center" flexDirection="column">
    <Text maxW="100px" isTruncated my={5} fontWeight="500" fontSize="1.1rem">
      {name}
    </Text>
    <Link href="#services" title={name}>
      <Flex
        sx={{ boxShadow: ' 0 0 8px #ccc' }}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="50%"
        height="100px"
        width="100px"
        alignItems="center"
        justifyContent="center"
      >
        <Image height="55%" src={src} />
      </Flex>
    </Link>
  </Flex>
);
export default Service;
