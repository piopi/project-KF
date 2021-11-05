import { extendTheme } from '@chakra-ui/react';

const overrides = {
  colors: {
    bg: {
      100: '#f8f8f8',
      200: '#797979',
      300: '#d5d5d5',
    },
    button: {
      100: '#5572b7',
    },
  },
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: any) => ({
      'html, body': {
        bgColor: props.colorMode === 'dark' ? 'gray.800' : 'bg.100',
      },
    }),
  },
};

const theme = extendTheme(overrides);

export default theme;
