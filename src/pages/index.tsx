import { FC } from 'react';

import { DisconnectButton } from '../components/DisconnectButton';

export const Home: FC = () => {
    return (
        <div className="m-8">
            <DisconnectButton />
        </div>
    );
};
