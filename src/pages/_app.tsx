import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Default as Theme, Light } from '../themes';
import { GlobalStyle } from '../common/utils/globalStyle';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';
import NavBar from '../common/components/navbar/NavBar';
import { providers } from 'ethers'
import '@rainbow-me/rainbowkit/styles.css'
import { WagmiProvider, chain } from 'wagmi'
import {
	RainbowKitProvider,
	Chain,
	getDefaultWallets,
	connectorsForWallets,
} from '@rainbow-me/rainbowkit'

const chains: Chain[] = [{ ...chain.mainnet, name: 'Ethereum' }]
const provider = () => new providers.InfuraProvider(1, process.env.NEXT_PUBLIC_INFURA_ID)

const wallets = getDefaultWallets({
	chains,
	appName: 'contract.house',
	infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	jsonRpcUrl: chain.mainnet.rpcUrls[0],
})

const SignalEdge = ({ Component, pageProps }: AppProps) => (
    <WagmiProvider
        autoConnect
        connectors={connectorsForWallets(wallets)}
        provider={provider}
    >
        <RainbowKitProvider chains={chains}>
            <ThemeProvider theme={Light}>
                <GlobalStyle />
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </RainbowKitProvider>
    </WagmiProvider>
);

export default appWithI18Next(SignalEdge, ni18nConfig);
