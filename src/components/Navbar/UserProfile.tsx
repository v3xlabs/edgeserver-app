import { ConnectButton } from '@rainbow-me/rainbowkit';
import { capitalizeFirstLetter } from '@utils/capitalize';
import { formatAddress } from '@utils/formatAddress';
import { gradientAvatar } from '@utils/gradientAvatar';
import { FC } from 'react';
import { useAccount, useConnect, useEnsAvatar, useEnsName } from 'wagmi';

export const UserProfile: FC = () => {
    const { data: userData, isSuccess } = useAccount();

    const { activeConnector } = useConnect();

    if (!isSuccess || !userData || !userData.address) return <></>;

    const {
        data: ENSName,
        // isError: ENSIsError,
        // isLoading: ENSIsLoading,
        // isSuccess: ENSIsSuccess,
    } = useEnsName({
        address: userData.address,
    });

    const { data: ENSAvatar } = useEnsAvatar({
        addressOrName: userData.address,
    });

    return (
        <div>
            <ConnectButton.Custom>
                {({ openAccountModal }) => {
                    return (
                        <button
                            className="flex items-center gap-2"
                            onClick={openAccountModal}
                        >
                            <div className="">
                                <div className="text-2 font-bold text-right">
                                    {ENSName
                                        ? `${ENSName} (${formatAddress(
                                              userData.address!
                                          )})`
                                        : formatAddress(userData.address!)}
                                </div>
                                <div className="text-1 opacity-50 text-right">
                                    Logged in with{' '}
                                    <b>
                                        {capitalizeFirstLetter(
                                            activeConnector?.id || 'unknown'
                                        )}
                                    </b>
                                </div>
                            </div>
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-neutral-700">
                                {ENSAvatar ? (
                                    <img
                                        src={ENSAvatar}
                                        className="w-12 h-12 rounded-full"
                                        alt="ENSavatar"
                                    />
                                ) : (
                                    <div
                                        className="w-12 h-12 rounded-full overflow-hidden"
                                        dangerouslySetInnerHTML={{
                                            __html: gradientAvatar(
                                                userData.address!
                                            ),
                                        }}
                                    />
                                )}
                            </div>
                        </button>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
};
