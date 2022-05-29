import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

export const UserProfile: FC = () => {
    const { data: userData, isSuccess } = useAccount();

    const {
        data: ENSName,
        isError: ENSIsError,
        isLoading: ENSIsLoading,
        isSuccess: ENSIsSuccess,
    } = useEnsName({
        address: userData.address,
    });

    const { data: ENSAvatar } = useEnsAvatar({
        addressOrName: userData.address,
    });

    if (!isSuccess) return <></>;

    return (
        <div>
            <ConnectButton.Custom>
                {({ openAccountModal }) => {
                    return (
                        <button onClick={openAccountModal}>
                            {ENSName ?? userData.address}
                        </button>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
};
