import React, { useState } from 'react';
import { Image, Flex, Button, Grid, GridItem, useColorMode, useColorModeValue, Link } from '@chakra-ui/react';
import { MoonIcon, SunIcon, CloseIcon } from '@chakra-ui/icons';
import SearchBar from '../../components/SearchBar/SearchBar';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const closeBtnColor = useColorModeValue('bg.200', 'white');
  const closeBtnBgColor = useColorModeValue('white', 'gray.900');
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Flex h="100px" alignItems="center" justifyContent="space-between">
        <Link href="/">
          <Image
            boxSize={{
              base: '80px',
              md: '100px',
              xl: '180px',
            }}
            objectFit="contain"
            src={colorMode === 'light' ? '/assets/klipfolio-logo.svg' : '/assets/klipfolio-logo-white.svg'}
            alt="Logo"
          />
        </Link>
        <SearchBar isOpen={isOpen} setOpen={() => setOpen(true)} setClose={() => setOpen(false)} />
        <Flex alignItems="center">
          <Grid w={[30, 30, '90px']} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={1}>
            <GridItem w={[10, 15, 15]}>
              {isOpen && (
                <Button
                  data-testid="closeButton"
                  bg={closeBtnBgColor}
                  color={closeBtnColor}
                  w={[10, 15, 15]}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon />
                </Button>
              )}
            </GridItem>
            <GridItem>
              <Button
                bg={useColorModeValue('white', 'gray.900')}
                color={useColorModeValue('bg.200', 'white')}
                w={[10, 15, 15]}
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
