import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useTranslation } from 'react-i18next';
import NavBar from '../common/components/navbar/NavBar';

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
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
