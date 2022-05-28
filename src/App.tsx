import '@rainbow-me/rainbowkit/dist/index.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

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

export const App = () => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <LoginFacade>
                    <div>
                        <div>Hello World</div>
                        <h1 className="text-3xl font-bold underline bg-teal">
                            Hello world!
                        </h1>
                    </div>
                </LoginFacade>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};
