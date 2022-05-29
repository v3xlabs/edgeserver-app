import { FC } from 'react';
import whitelist from 'url:../../../assets/whitelist.svg';
import { useAccount, useConnect, useEnsAvatar, useEnsName } from 'wagmi';

import { DisconnectButton } from '../../components/DisconnectButton';
import { capitalizeFirstLetter } from '../../utils/capitalize';

export const Whitelist: FC = () => {
    const { data: Wallet, isSuccess } = useAccount();

    const { data: ENSAvatar } = useEnsAvatar({
        addressOrName: Wallet?.address,
    });
    const { data: ENSName } = useEnsName({ address: Wallet?.address });

    const { activeConnector } = useConnect();

    if (!Wallet || !isSuccess) return <>Error Auth Data</>;

    return (
        <div className="p-8 card w-full max-w-xl flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <img src={whitelist} className="w-16 h-16" />
                <h2 className="text-2xl font-bold">WHITELIST</h2>
            </div>
            <div>Sorry! It appears you are not on the whitelist!</div>
            <div>You are logged in as</div>
            <div className="flex items-center gap-4 flex-wrap">
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-neutral-700">
                    <img src={ENSAvatar} className="w-16 h-16 rounded-full" />
                </div>
                <div className="flex-1">
                    <div className="font-bold">{ENSName || Wallet.address}</div>
                    <div className="opacity-50">
                        Logged in with{' '}
                        <b>
                            {capitalizeFirstLetter(
                                activeConnector?.id || 'unknown'
                            )}
                        </b>
                    </div>
                </div>
            </div>
            <div>
                <DisconnectButton label="Try another account" full />
            </div>
        </div>
    );
};
