import { FC } from 'react';

import { Login } from '../pages/Login';
import { useAuth } from '../utils/useAuth';

export const LoginFacade: FC = ({ children }) => {
    const { state } = useAuth();

    if (state !== 'authenticated') return <Login />;

    return <>{children}</>;
};
