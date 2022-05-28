import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useSignTypedData } from 'wagmi';
import { Button } from '../common/components/button/Button';
import { PageWrapper } from '../common/components/page-wrapper/PageWrapper';

const Home: NextPage = () => {
    const { t } = useTranslation();

    // const [{loading, error, data},b] = useAccount({fetchEns: true});

    return (
        <div>
            <Head>
                <title>{t('settings.language')}</title>
                <meta name="description" content={t('settings.description')} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{t('settings.language')}</h1>
            <Button label={t('navbar.login')} />
        </div>
    );
};

export default Home;

export const LoginFacade: FC = ({children}) => {

    const {data,isLoading,isSuccess} = useAccount();

    if (isLoading)
        return <>Loading</>;

    if (isSuccess)
        return <>Success</>;

    return <>children</>;
};
