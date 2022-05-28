import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useAccount, useSignTypedData } from 'wagmi';
import { Button } from '../common/components/button/Button';
import { PageWrapper } from '../common/components/page-wrapper/PageWrapper';

const types = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
    ],
    Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
    ],
};

const value = {
    from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
};

const Home: NextPage = () => {
    const { t } = useTranslation();

    // const [{loading, error, data},b] = useAccount({fetchEns: true});
    // console.log(data);
    const { data, error, signTypedData, isLoading, isSuccess, isError } =
        useSignTypedData({
            domain: { name: 'Signal', version: '1.0' },
            types,
            value,
        });
    console.log(data);

    return (
        <PageWrapper>
            <Head>
                <title>{t('settings.language')}</title>
                <meta name="description" content={t('settings.description')} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{t('settings.language')}</h1>
            <Button label={t('navbar.login')} />

            <div onClick={() => signTypedData()}>BUTTON</div>

            <h1 className="text-3xl font-bold underline ">
                Hello world!
            </h1>
        </PageWrapper>
    );
};

export default Home;
