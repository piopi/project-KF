import React from 'react';
import { Tag, TagLabel, Flex } from '@chakra-ui/react';

interface Props {
  name: string;
  toggleTags: (tag: string) => void;
  selectedTags: string[];
}
interface PropTags {
  toggleTags: (tag: string) => void;
  selectedTags: string[];
}
export const SearchTag = ({ name, toggleTags, selectedTags }: Props) => (
  <Tag
    borderRadius="5px"
    px="10px"
    mx="5px"
    width={['100%', '100%', 'fit-content']}
    sx={{ justifyContent: 'center' }}
    variant={selectedTags.includes(name) ? 'solid' : 'outline'}
    colorScheme="blue"
    my={['5px', '5px', '0px']}
    onClick={() => toggleTags(name)}
  >
    <TagLabel>{name}</TagLabel>
  </Tag>
);

const SearchTags = ({ toggleTags, selectedTags }: PropTags) => (
  <Flex flexDirection={['column', 'column', 'row']} alignItems="center" p="10px">
    <SearchTag name="Service" toggleTags={toggleTags} selectedTags={selectedTags} />
    <SearchTag name="Data Source" toggleTags={toggleTags} selectedTags={selectedTags} />
    <SearchTag name="Visualization" toggleTags={toggleTags} selectedTags={selectedTags} />
  </Flex>
);

export default SearchTags;
