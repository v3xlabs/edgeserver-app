import { FC } from 'react';
import { SiweMessage } from 'siwe';
import {
    useAccount,
    useConnect,
    useEnsAvatar,
    useEnsName,
    useSignMessage,
} from 'wagmi';

import { DisconnectButton } from '../../components/DisconnectButton';
import { capitalizeFirstLetter } from '../../utils/capitalize';
import { useJWT } from '../../utils/useAuth';

export const LoginStepTwo: FC = () => {
    const { data: Wallet, isSuccess } = useAccount();
    const setToken = useJWT((state) => state.setToken);

    const { data: ENSAvatar } = useEnsAvatar({
        addressOrName: Wallet?.address,
    });
    const { data: ENSName } = useEnsName({ address: Wallet?.address });

    const { activeConnector } = useConnect();
    const payload = {
        domain: window.location.host,
        address: Wallet.address,
        statement: 'Sign in with Ethereum to the app.',
        chainId: 137,
        uri: window.location.origin,
        version: '1',
    };
    const message = new SiweMessage(payload);
    const {
        signMessage,
        isLoading: signIsLoading,
        reset: resetSignage,
    } = useSignMessage({
        message: message.prepareMessage(),
        onSuccess: async (data, _variables) => {
            console.log('Successfully added,', data, JSON.stringify(message));
        },
    });

    if (!Wallet || !isSuccess) return <>Error Auth Data</>;

    return (
        <div className="p-8 card w-full max-w-xl flex flex-col gap-4">
            <h2 className="text-lg mb-4">Step two</h2>
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
                <div>
                    <DisconnectButton />
                </div>
            </div>
            <div>
                {signIsLoading ? (
                    <button
                        className="w-full bg-neutral-500 text-white px-16 py-5 rounded-lg font-bold text-md justify-center items-center flex gap-4 hvr-hover hover:bg-red-600"
                        onClick={() => resetSignage()}
                    >
                        <span className="hvr-regular">Loading...</span>
                        <span className="hvr-alt">(Click to Cancel)</span>
                    </button>
                ) : (
                    <button
                        className="w-full bluebutton px-16 py-5 rounded-lg font-bold text-md justify-center items-center flex gap-4"
                        onClick={() => signMessage()}
                    >
                        Authorize Device
                    </button>
                )}
            </div>
        </div>
    );
};
