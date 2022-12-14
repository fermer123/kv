import AsteroidCard from '../components/AsteroidCard';
import Body from '../components/Body';
import Footer from '../components/Footer';

import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';

const key = 'mQzujJfzbi1rzZeOq8XuJYgSI4P8qGevjZCYrVzZ';
const date = new Date();
const dateNow =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const resp = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${key}`,
  );
  const data = await resp.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  const pic = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const res = await pic.json();
  if (!res) {
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

const Asteroid = ({ data, pic }) => {
  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} onclick={true} />
      <Body />
      <AsteroidCard data={data} />
      <Footer cart={false} />
    </div>
  );
};

export default Asteroid;
