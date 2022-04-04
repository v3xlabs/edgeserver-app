import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
        background: ${({theme}) => theme.page.background};
        color: ${({theme}) => theme.text.primary};
        font-family: sans-serif;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
`;