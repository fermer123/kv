import { Context } from '../components/Context';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
};

export default MyApp;
