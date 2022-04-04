import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    navbar: {
        background: string, // Background Color
        height: string // Height in px
    }
  }
}