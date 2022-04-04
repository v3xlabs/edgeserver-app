import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ThemeProvider } from "styled-components";
import { Default as Theme, Light } from "../themes";
import {GlobalStyle} from '../common/utils/globalStyle';

import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'
import NavBar from '../common/components/navbar/NavBar';

const SignalEdge = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={Light}>
        <GlobalStyle />
        <NavBar />
        <Component {...pageProps} />
    </ThemeProvider>
);

export default appWithI18Next(SignalEdge, ni18nConfig)
