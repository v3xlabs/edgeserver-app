import { FC } from 'react';
import Logo from '../logo/Logo';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
    width: 100%;
    height: 80px;
    background: ${(t)=>t.theme.colors.background};
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
                Login
            </NavSide>
        </Wrapper>
    );
};

export default NavBar;