import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    page: {
      background: string
    },
    border: {
      color: string,
      width: string,
    },
    card: {
      borderRadius: string,
    }
    navbar: {
        background: string, // Background Color
        height: string // Height in px
    },
    text: {
      primary: string,
      secondary: string
    }
  }
}