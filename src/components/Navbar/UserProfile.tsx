import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatAddress } from '@utils/formatAddress';
import { gradientAvatar } from '@utils/gradientAvatar';
import { useENS } from '@utils/queries/useENS';
import { FC } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const UserProfile: FC = () => {
    const { data: userData, isSuccess } = useAccount();

    const { activeConnector } = useConnect();

    const { Name, Avatar } = useENS();

    if (!isSuccess || !userData || !userData.address) return <></>;

    return (
        <ConnectButton.Custom>
            {({ openAccountModal }) => {
                return (
                    <button
                        className="flex items-center h-full pr-4 gap-2"
                        onClick={openAccountModal}
                    >
                        <div className="">
                            <div className="text-2 font-bold text-right leading-tight">
                                {Name
                                    ? `${Name}`
                                    : formatAddress(userData.address!)}
                            </div>
                            <div className="text-1 opacity-50 text-right text-xs leading-3">
                                {Name && formatAddress(userData.address!)}
                                {/* Logged in with{' '}
                                    <b>
                                        {capitalizeFirstLetter(
                                            activeConnector?.id || 'unknown'
                                        )}
                                    </b> */}
                            </div>
                        </div>
                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-neutral-700">
                            {Avatar ? (
                                <img
                                    src={Avatar}
                                    className="w-10 h-10 rounded-full"
                                    alt="ENSavatar"
                                />
                            ) : (
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden"
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
    );
};
