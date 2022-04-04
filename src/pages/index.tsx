import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/components/button/Button';
import { PageWrapper } from '../common/components/page-wrapper/PageWrapper';

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Head>
                <title>{t('settings.language')}</title>
                <meta
                    name="description"
                    content={t('settings.description')}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{t('settings.language')}</h1>
            <Button label={t('navbar.login')}/>
        </PageWrapper>
    );
};

export default Home;
