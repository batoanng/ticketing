import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';

const _app = ({ Component, pageProps }) => {
    return <div>
        <Head>
            <title>Custom joker7nbt.dev</title>
        </Head>
        <Component {...pageProps} />
    </div>
}

export default _app;
