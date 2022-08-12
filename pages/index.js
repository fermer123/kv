import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';

export const getServerSideProps = async (context) => {
  const resp = await fetch(
    'https://api.nasa.gov/planetary/apod?api_key=pMhhAzZ4AZEhzBRptqelqCGHLgSWfxLcvH1utW9N',
  );
  const data = await resp.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

const Home = ({ data }) => {
  return (
    <div className={wrapper.wrapper}>
      <Head data={data} />
      <Body />
    </div>
  );
};
export default Home;
