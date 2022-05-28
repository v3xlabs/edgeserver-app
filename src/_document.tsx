import '@rainbow-me/rainbowkit/dist/index.css';

import {
    darkTheme,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { App } from './App';
import { LoginFacade } from './components/LoginFacade';

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Signal Edge',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export const Document = () => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
                <div className="dark:bg-black-800 dark:text-white text-black-800 bg-neutral-100 w-full min-h-screen">
                    <LoginFacade>
                        <App />
                    </LoginFacade>
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};
