import type { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/components/button/Button';
import { PageWrapper } from '../../common/components/page-wrapper/PageWrapper';

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Head>
                <title>{t('projects.title')}</title>
                <meta name="description" content={t('settings.description')} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{t('projects.title')}</h1>

        </PageWrapper>
    );
};

export default Home;
