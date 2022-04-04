import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{width: string, flex: number, padding: boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${({width}) => width};
    flex: ${({flex}) => flex || 0};
    border-width: ${({theme}) => theme.border.width};
    border-color: ${({theme}) => theme.border.color};
    border-style: solid;
    border-radius: ${({theme}) => theme.card.borderRadius};
    padding: ${({padding}) => padding ? '1rem' : 0};
`;

const Card: FC<{
    width?: string,
    flex?: number,
    padding?: boolean,
}> = ({width = '400px', flex = 1, padding = false, children}) => {
    return (
        <Wrapper width={width} flex={flex} padding={padding}>
            {children}
        </Wrapper>
    );
};

export default Card;
