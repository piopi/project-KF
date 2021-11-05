import React from 'react';
import { Tag, TagLabel, Flex } from '@chakra-ui/react';

interface Props {
  name: string;
}
export const SearchTag = ({ name }: Props) => (
  <Tag
    borderRadius="5px"
    px="10px"
    mx="5px"
    width={['100%', '100%', 'fit-content']}
    sx={{ justifyContent: 'center' }}
    variant="outline"
    colorScheme="blue"
    my={['5px', '5px', '0px']}
  >
    <TagLabel>{name}</TagLabel>
  </Tag>
);

const SearchTags = () => (
  <Flex flexDirection={['column', 'column', 'row']} alignItems="center" p="10px">
    <SearchTag name="Service" />
    <SearchTag name="Data Source" />
    <SearchTag name="Visualization" />
  </Flex>
);

export default SearchTags;
