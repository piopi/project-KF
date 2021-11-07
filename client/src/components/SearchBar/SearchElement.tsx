import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  name: string;
  type: string;
}
const SearchElement = ({ name, type }: Props) => {
  const hoverColor = useColorModeValue('blue.50', 'gray.600');
  return (
    <Flex
      borderTop="1px"
      borderColor={useColorModeValue('bg.300', 'gray.500')}
      px="10px"
      py="10px"
      w="100%"
      _hover={{
        background: hoverColor,
        color: 'black',
      }}
      justifyContent="space-between"
    >
      <Text width="50%" fontSize={['0.7rem', '1rem']}>
        {name}
      </Text>
      <Text color={useColorModeValue('bg.300', 'bg.200')} fontSize={['0.7rem', '1rem']}>
        {type}
      </Text>
    </Flex>
  );
};
export default SearchElement;
