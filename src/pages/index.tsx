import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import NavBar from '../common/components/navbar/NavBar';

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <NavBar />
            <Head>
                <title>{t('test.hi')}</title>
                <meta
                    name="description"
                    content={t('generated-by-create-next-app')}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{t('test.hi')}</h1>
        </div>
    );
};

export default Home;
