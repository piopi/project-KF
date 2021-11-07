import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, useColorModeValue, Button, useBreakpointValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchElement from './SearchElement';
import SearchTags from './SearchTags';
import { useAppSelector } from '../../store/store';

interface Props {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

interface Search {
  type: string;
  name: string;
}

const SearchBar = ({ isOpen, setOpen, setClose }: Props) => {
  const searchContent = useBreakpointValue({ base: <SearchIcon />, md: 'Search' }); // change from Text to icon the Search button
  const placeHolderColor = useColorModeValue('bg.300', 'bg.200');
  const borderColor = useColorModeValue('bg.300', 'gray.600');
  const menuColor = useColorModeValue('white', 'gray.900');
  // Search function and filter
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const [searchResult, setsearchResult] = useState([] as Search[]); // Store a formatted data from the store
  const [filteredResult, setfilteredResult] = useState([] as Search[]);
  const [keyword, setKeyword] = useState('');
  const services = useAppSelector((state) => state.services.data);
  const visualizations = useAppSelector((state) => state.visualizations.data);
  const dataSources = useAppSelector((state) => state.dataSources.data);
  useEffect(() => {
    const formatServices = () => services.map((service) => ({ type: 'Service', name: service.name }));
    const formatDataSources = () =>
      dataSources.map((dataSource) => ({ type: 'Data Source', name: dataSource.dataName }));
    const formatVisualizations = () =>
      visualizations.map((visualization) => ({ type: 'Visualization', name: visualization.dataEntryName }));
    setsearchResult([...formatServices(), ...formatDataSources(), ...formatVisualizations()]);
  }, [dataSources, services, visualizations]);
  useEffect(() => {
    if (selectedTags.length) {
      setfilteredResult(
        searchResult.filter((element) => selectedTags.includes(element.type) && element.name.includes(keyword)),
      );
    } else {
      setfilteredResult(searchResult.filter((element) => element.name.includes(keyword)));
    }
  }, [searchResult, selectedTags, keyword]);
  const toggleTags = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((element) => element !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const popUpStyle = {
    width: '100%',
    marginTop: '45px',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: '10',
    border: '1px solid',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '10px',
      borderRadius: '10px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: `transparent`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#d6dee1',
      borderRadius: '15px',
      border: '3px solid transparent',
      backgroundClip: 'content-box',
    },
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
          onChange={(e) => setKeyword(e.target.value)}
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
          height="30vh"
        >
          <SearchTags toggleTags={toggleTags} selectedTags={selectedTags} />
          {filteredResult.map((search) => (
            <SearchElement name={search.name} type={search.type} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default SearchBar;
