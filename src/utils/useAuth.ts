import { useAccount } from 'wagmi';
import create from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuth = () => {
    const token = useJWT((state) => state.token);
    const { data, isSuccess, status } = useAccount();

    if (!data || !isSuccess) return { state: 'no-wallet' };

    if (!token) return { state: 'no-token' };

    return { state: 'authenticated' };
};
