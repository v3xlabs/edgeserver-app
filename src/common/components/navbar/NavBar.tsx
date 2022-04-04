import { FC } from 'react';
import Logo from '../logo/Logo';
import styled from 'styled-components';
import Link from 'next/link';
import {Button} from '../button/Button';

const Wrapper = styled.div`
    width: 100%;
    height: ${({theme}) => theme.navbar.height};
    background: ${({theme}) => theme.navbar.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavSide = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const NavItem = styled(Link)`
    display: block;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const NavBar: FC = () => {

    return (
        <Wrapper>
            <NavSide>
                <Logo />
                <NavItem href="/">Hello</NavItem>
            </NavSide>
            <NavSide>
                <Button>Login</Button>
                Login
            </NavSide>
        </Wrapper>
    );
};

export default NavBar;