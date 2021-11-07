import React from 'react';
import { Grid, SimpleGrid, Flex, useColorModeValue, Text, Box } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import ChartLine from './ChartLine';

interface Props {
  name: string;
  currency: string;
  data: number[];
}
// ----------------Helper Functions-------------------------------
const percIncrease = (a: number, b: number) => {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
};
// format Number to '3,500' or '3.5K' depending of the sign
const formatNumber = (num: number, sign: string) =>
  sign === '$'
    ? new Intl.NumberFormat('en-US', { style: 'decimal' }).format(num)
    : new Intl.NumberFormat('en-GB', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(num);
//----------------------------------------------------------------
const Visualization = ({ name, currency, data }: Props) => {
  const increase = percIncrease(data[0], data[data.length - 1]);
  return (
    <Flex my={5} w="fit-content">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(1, 1fr)"
        sx={{ boxShadow: ' 0 0 8px #ccc' }}
        _hover={{ boxShadow: ' 0 0 15px #999999' }}
        bg={useColorModeValue('white', 'gray.700')}
        height="150px"
        width="220px"
        columns={1}
      >
        <SimpleGrid columns={2} width="220px" h="60px" px="3">
          <Box pt="15px">
            <Text textTransform="uppercase" lineHeight="1" isTruncated fontWeight="500" fontSize="1.1rem">
              {name}
            </Text>
            <Text position="relative" lineHeight="1" isTruncated mt="25px" fontWeight="700" fontSize="1.3rem">
              {currency === '$' && (
                <Text position="absolute" fontSize="1rem" as="span">
                  $
                </Text>
              )}

              <Text pl={currency === '$' ? '10px' : '0px'} as="span">
                {formatNumber(data[data.length - 1], currency)}
              </Text>
            </Text>
          </Box>
          <Box pt="40px" textAlign="center">
            <Text top="2" right="0" fontWeight="500" fontSize="1.1rem" color={increase >= 0 ? 'green.400' : 'red.500'}>
              {increase >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {`${increase}%`}
            </Text>
            <Text color="#ccc" fontSize="0.6rem" isTruncated>
              vs previous {data.length} days
            </Text>
          </Box>
        </SimpleGrid>
        <Flex position="relative" sx={{ overflow: 'hidden' }} w="100%" h="100%">
          <Box position="absolute" bottom={-1} w="100%" h="100%">
            <ChartLine data={data} />
          </Box>
        </Flex>
      </Grid>
    </Flex>
  );
};
export default Visualization;
