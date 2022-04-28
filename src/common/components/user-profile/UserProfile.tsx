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
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
            }) => {
                return (
                    <div>
                        {(() => {
                            if (!account || !chain) {
                                return (
                                    <Button
                                        onClick={openConnectModal}
                                        label={t('navbar.login')}
                                        type="button"
                                    />
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <div onClick={openChainModal}>
                                        Wrong network
                                    </div>
                                );
                            }

                            return (
                                <Profile onClick={openAccountModal}>
                                    {account.ensAvatar && (
                                        <Image
                                            className="w-8 h-8 rounded-full"
                                            src={account.ensAvatar}
                                            alt="ENS Profile Picture"
                                            width="32"
                                            height="32"
                                        />
                                    )}
                                    <span>{account.displayName}</span>
                                </Profile>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
