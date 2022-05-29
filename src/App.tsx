import { FC } from 'react';

import { DisconnectButton } from './components/DisconnectButton';
import { Navbar } from './components/Navbar/Navbar';

export const App: FC = () => {
    return (
        <div>
            <Navbar />
            <div className="m-8">
                <DisconnectButton />
            </div>
        </div>
    );
};
