import { changeLanguage } from "i18next";
import { useSyncLanguage } from "ni18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

const Flags = {
    'en': '🇺🇸',
    'nl': '🇳🇱',
}

export const Wrapper = styled.select`
    background: transparent;
    border: none;
    font-size: 1rem;
    appearance: none;
`;

export const Flag = styled.option`

`;

export const LanguageSwitcher: FC = () => {
    const {i18n} = useSyncLanguage();
    
    return (
        <Wrapper onChange={(event) => {
            i18n.changeLanguage(event.target.value);
        }} defaultValue={i18n.language} value={i18n.language}>
            {
                (Object.keys(Flags) as (keyof typeof Flags)[]).map((flag) => (
                    <Flag value={flag} key={flag}>{Flags[flag]}</Flag>
                ))
            }
        </Wrapper>
    );
};