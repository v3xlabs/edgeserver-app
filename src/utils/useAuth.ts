import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { environment } from './enviroment';
import { deleteSelfAuthKey } from './queries/deleteAuthKey';

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
            resetToken: () =>
                set((_state) => {
                    try {
                        deleteSelfAuthKey(_state.token);
                    } catch {
                        console.log('failed to delete own auth key, skip');
                    }

                    return { token: '' };
                }),
        }),
        { name: 'SIGNAL-token' }
    )
);

export const useWhitelist = (address: string) => {
    const [whitelisted, setWhitelisted] = useState(true);

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

export const useAdminStore = create<{
    configured: boolean | 'unchecked' | 'pending';
    fetchConfigured: () => void;

    admin: boolean | 'unchecked' | 'pending';
    fetchAdmin: () => void;
}>((set) => ({
    configured: 'unchecked',
    fetchConfigured: async () => {
        set({
            admin: 'pending',
        });

        const response = await fetch(
            environment.API_URL + '/api/admin/setup/check'
        );

        const body = await response.json();

        set({
            configured: !!body['configured'],
        });
    },

    admin: 'unchecked',
    fetchAdmin: async () => {
        set({
            admin: 'pending',
        });

        const response = await fetch(environment.API_URL + '/api/admin/check', {
            headers: {
                Authorization: 'Bearer ' + useJWT.getState().token,
            },
        });

        const body = await response.json();

        set({
            admin: !!body['admin'],
        });
    },
}));

export const useSetup = () => {
    const { configured, fetchConfigured } = useAdminStore((state) => ({
        configured: state.configured,
        fetchConfigured: state.fetchConfigured,
    }));

    useEffect(() => {
        if (configured === 'unchecked') {
            fetchConfigured();
        }
    }, []);

    return configured;
};

export const useAdmin = () => {
    const { admin, fetchAdmin } = useAdminStore((state) => ({
        admin: state.admin,
        fetchAdmin: state.fetchAdmin,
    }));

    useEffect(() => {
        if (admin === 'unchecked') {
            fetchAdmin();
        }
    }, []);

    return admin;
};

export const useAuth = () => {
    const token = useJWT((state) => state.token);
    const { data, isLoading, isSuccess } = useAccount();
    const whitelisted = useWhitelist(data?.address || '');

    const configured = useSetup();

    if (!data?.address) return { state: 'no-wallet' };

    if (isLoading && token) return { state: 'loading-alt' };

    if (isLoading) return { state: 'loading' };

    if (!data || !isSuccess) return { state: 'no-wallet' };

    if (configured === false)
        return { state: 'not-setup', address: data.address };

    if (!whitelisted)
        return { state: 'not-whitelisted', address: data.address };

    if (!token) return { state: 'no-token', address: data.address };

    return { state: 'authenticated', address: data.address };
};
