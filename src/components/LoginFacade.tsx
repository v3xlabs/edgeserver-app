import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { useAccount } from 'wagmi';

export const LoginFacade: FC = ({ children }) => {
    const { isSuccess, data } = useAccount();

    if (!isSuccess || !data)
        return (
            <div>
                You need to log in <ConnectButton />
            </div>
        );

    return <>{children}</>;
};
