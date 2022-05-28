import { FC } from 'react';
import { useDisconnect } from 'wagmi';

import { useJWT } from '../utils/useAuth';

export const DisconnectButton: FC = () => {
    const { disconnect: disconnectWallet } = useDisconnect();
    const resetToken = useJWT((state) => state.resetToken);

    return (
        <button
            className="w-full px-10 max-w-xs py-5 rounded-lg bg-accent-blue-alt text-accent-blue-normal font-bold text-md flex gap-4 justify-center items-center"
            onClick={() => {
                disconnectWallet();
                resetToken();
            }}
        >
            Disconnect
        </button>
    );
};
