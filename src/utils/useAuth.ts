import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { environment } from './enviroment';

type JWTData = {
    token: string;
};

export const useJWT = create(
    persist<
        JWTData & { setToken: (_token: string) => void; resetToken: () => void }
    >(
        (set) => ({
            token: '',
            setToken: (token) => set((_state) => ({ token })),
            resetToken: () => set((_state) => ({ token: '' })),
        }),
        { name: 'SIGNAL-token' }
    )
);

export const useWhitelist = (address: string) => {
    const [whitelisted, setWhitelisted] = useState(false);

    useEffect(() => {
        if (!address) {
            setWhitelisted(false);

            return;
        }

        (async () => {
            // Insert code to actually fetch whitelisted status here

            const response = await fetch(
                environment.API_URL +
                    '/api/login/whitelist/' +
                    address.toLowerCase()
            );

            const body = await response.json();

            setWhitelisted(!!body['exists']);
        })();
    }, [address]);

    return whitelisted;
};

export const useAuth = () => {
    const token = useJWT((state) => state.token);
    const { data, isLoading, isSuccess } = useAccount();
    const whitelisted = useWhitelist(data?.address || '');

    if (!data?.address) return { state: 'no-wallet' };

    if (isLoading && token) return { state: 'loading-alt' };

    if (isLoading) return { state: 'loading' };

    if (!data || !isSuccess) return { state: 'no-wallet' };

    if (!whitelisted) return { state: 'not-whitelisted' };

    if (!token) return { state: 'no-token' };

    return { state: 'authenticated' };
};
