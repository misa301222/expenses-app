import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import Popper from 'popper.js';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import "@fortawesome/fontawesome-svg-core/styles.css"; 

function MyApp({ Component, pageProps }: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>

  );
}

export default MyApp;
