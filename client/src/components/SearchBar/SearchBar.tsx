import React from 'react';
import { Box, Flex, Input, useColorModeValue, Button, useBreakpointValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchElement from './SearchElement';
import SearchTags from './SearchTags';

interface Props {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const SearchBar = ({ isOpen, setOpen, setClose }: Props) => {
  const searchContent = useBreakpointValue({ base: <SearchIcon />, md: 'Search' }); // change from Text to icon the Search button
  const placeHolderColor = useColorModeValue('bg.300', 'bg.200');
  const borderColor = useColorModeValue('bg.300', 'gray.600');
  const menuColor = useColorModeValue('white', 'gray.900');
  const popUpStyle = {
    width: '100%',
    marginTop: '45px',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: '10',
    border: '1px solid',
  };
  return (
    <Flex flexDirection="column" w="50%" maxW="600px" sx={{ position: 'relative' }}>
      <Box pos="relative">
        <Input
          borderRadius="0px"
          focusBorderColor="bg.300"
          borderColor={useColorModeValue('bg.300', 'gray.600')}
          fontSize="15px"
          placeholder="Keyword"
          _placeholder={{ color: placeHolderColor }}
          onFocus={() => setOpen()}
        />
        <Button
          bg={useColorModeValue('button.100', 'gray.600')}
          borderRadius="4px"
          color="white"
          pos="absolute"
          right="5px"
          zIndex="2"
          height="80%"
          top="10%"
          fontWeight="300"
          onClick={() => setClose()}
        >
          {searchContent}
        </Button>
      </Box>
      {isOpen && (
        <Flex
          border="1px"
          borderColor={borderColor}
          bg={menuColor}
          flexDirection="column"
          sx={popUpStyle}
          data-testid="searchMenu"
        >
          <SearchTags />
          <SearchElement name="Net Profit Margin" type="www" />
          <SearchElement name="eee" type="www" />
          <SearchElement name="eee" type="www" />
        </Flex>
      )}
    </Flex>
  );
};

export default SearchBar;
