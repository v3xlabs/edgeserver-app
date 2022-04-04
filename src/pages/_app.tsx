import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ThemeProvider } from "styled-components";
import { Default as Theme } from "../themes";
import {GlobalStyle} from '../common/utils/globalStyle';

import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'
import {ThemeProvider as PrimerThemeProvider} from '@primer/react';

const SignalEdge = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={Theme}>
        <PrimerThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
        </PrimerThemeProvider>
    </ThemeProvider>
);

export default appWithI18Next(SignalEdge, ni18nConfig)
