import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Default as Theme, Light } from '../themes';
import { GlobalStyle } from '../common/utils/globalStyle';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';
import NavBar from '../common/components/navbar/NavBar';
import '@rainbow-me/rainbowkit/styles.css'
import { chain, WagmiConfig, createClient, configureChains } from 'wagmi'
import {
  RainbowKitProvider,
	getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public';
import { LoginFacade } from './login';


const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [
    //   alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Signal Edge',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

const SignalEdge = ({ Component, pageProps }: AppProps) => (
    <WagmiConfig
    client={wagmiClient}
    >
        <RainbowKitProvider chains={chains}>
            <ThemeProvider theme={Light}>
                <GlobalStyle />
                <LoginFacade>
                  <NavBar />
                  <Component {...pageProps} />
                </LoginFacade>
            </ThemeProvider>
        </RainbowKitProvider>
    </WagmiConfig>
);

export default appWithI18Next(SignalEdge, ni18nConfig);
