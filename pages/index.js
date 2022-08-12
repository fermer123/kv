import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
const date = new Date();
const dateNow =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

console.log(dateNow);
export const getServerSideProps = async (context) => {
  const pic = await fetch(
    'https://api.nasa.gov/planetary/apod?api_key=pMhhAzZ4AZEhzBRptqelqCGHLgSWfxLcvH1utW9N',
  );
  const res = await pic.json();

  const resp = await fetch(
    //'https://api.nasa.gov/planetary/apod?api_key=pMhhAzZ4AZEhzBRptqelqCGHLgSWfxLcvH1utW9N',
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateNow}&api_key=pMhhAzZ4AZEhzBRptqelqCGHLgSWfxLcvH1utW9N`,
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
      pic: res,
    },
  };
};

const Home = ({ data, pic }) => {
  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <Body />
    </div>
  );
};
export default Home;
