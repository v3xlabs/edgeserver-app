import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: 2rem;
`;

export const PageWrapper: FC = ({children}) => {
    return (
        <Wrapper>
            { children }
        </Wrapper>
    );
};