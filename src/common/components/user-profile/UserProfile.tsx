import Image from 'next/image';
import { Button } from '../button/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Profile = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const UserProfile = () => {
    const { t } = useTranslation();

    return (
        <ConnectButton />
    );
};
