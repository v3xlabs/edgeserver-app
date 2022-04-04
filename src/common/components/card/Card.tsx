import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Card: FC = () => {
    return (
        <Wrapper>
            <h1>YEEET</h1>
        </Wrapper>
    );
};

export default Card;
