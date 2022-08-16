import { useContext, useEffect } from 'react';
import AsteroidCard from '../components/AsteroidCard';
import Body from '../components/Body';
import { CustomContext } from '../components/Context';
import Head from '../components/Head';

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
    <div>
      <Head data={pic} onclick={true} />
      <Body />
      {Array(data).map((e) => (
        <AsteroidCard key={e.id} data={e} />
      ))}
    </div>
  );
};

export default Asteroid;
