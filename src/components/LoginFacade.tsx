import { FC } from 'react';

import { Login } from '../pages/login/Login';
import { useAuth } from '../utils/useAuth';

export const LoginFacade: FC = ({ children }) => {
    const { state } = useAuth();
    // const {
    //     isError,
    //     isFetched,
    //     isFetching,
    //     isIdle,
    //     isLoading,
    //     isRefetching,
    //     isSuccess,
    // } = useAccount();

    // console.log(state, {
    //     isError,
    //     isFetched,
    //     isFetching,
    //     isIdle,
    //     isLoading,
    //     isRefetching,
    //     isSuccess,
    // });

    // User has token and is waiting for address to confirm
    if (state === 'loading-alt') return <>resuming session...</>;

    // User does not have token&address pair (step1 & step2)
    if (state !== 'authenticated') return <Login />;

    return <>{children}</>;
};
