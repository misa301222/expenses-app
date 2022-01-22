import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css';
import { motion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProps } from 'next/dist/shared/lib/router/router';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <motion.div key={router.route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <Component {...pageProps} />
        </motion.div>
      </Layout>
    </SessionProvider >

  );
}

export default MyApp;
