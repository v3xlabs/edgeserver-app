import { FC } from 'react';
import Logo from '../logo/Logo';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '../button/Button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../language-switcher/LanguageSwitcher';
import { UserProfile } from '../user-profile/UserProfile';

const Wrapper = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.navbar.height};
    background: ${({ theme }) => theme.navbar.background};
    color: ${({ theme }) => theme.navbar.text.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
`;

const NavSide = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
`;

const NavItem = styled.div`
    a {
        display: block;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-weight: bolder;
        margin-left: 0.5em;
        margin-right: 0.5em;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const NavBar: FC = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <NavSide>
                <Logo />
                <NavItem><Link href="/">{t('navbar.dashboard')}</Link></NavItem>
                <NavItem><Link href="/projects">{t('navbar.projects')}</Link></NavItem>
                <NavItem><Link href="/settings">{t('navbar.settings')}</Link></NavItem>
            </NavSide>
            <NavSide>
                <LanguageSwitcher />
                <UserProfile />
            </NavSide>
        </Wrapper>
    );
};

export default NavBar;
