import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button<{variant: string}>`
    background: ${({variant}) => variant == 'primary' ? '#6D3DDC' : '#222'};
    width: fit-content;
    padding: 3px 12px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 0.25em;
    border: ${({theme}) => theme.border.width} solid ${({theme}) => theme.border.color};
    cursor: pointer;
    transition: .2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color,background-color,border-color;

    position: relative;
    display: inline-block;
    font-weight: 500;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid;
    border-radius: 6px;

    color: ${({variant}) => variant === 'primary' ? 'white' : '#24292f'};
    background-color: ${({variant}) => variant === 'primary' ? '#218bff' : '#f6f8fa'};
    border-color: ${({variant}) => variant === 'primary' ? 'rgba(27,31,36,0.15)' : 'rgba(27,31,36,0.15)'};
    box-shadow: ${({variant}) => variant === 'primary' ? '0 1px 0 rgba(27,31,36,0.1), inset 0 1px 0 rgba(255,255,255,0.03)' : '0 1px 0 rgba(27,31,36,0.04), inset 0 1px 0 rgba(255,255,255,0.25)'};

    &:hover {
        opacity: 0.8;
    }
`;

export const Button: FC<{
    variant?: 'primary' | 'secondary',
    label: string,
}> = ({ variant = 'secondary', label }) => {

    return (
        <Wrapper variant={variant}>
            {label}
        </Wrapper>
    );
};
