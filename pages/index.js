import { useEffect, useState } from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import AsteroidInfo from '../components/AsteroidInfo';

const key = 'pMhhAzZ4AZEhzBRptqelqCGHLgSWfxLcvH1utW9N';
const date = new Date();
const dateNow =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

export const getServerSideProps = async (context) => {
  const pic = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const res = await pic.json();

  const resp = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateNow}&api_key=${key}`,
  );
  const data = await resp.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

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

const Home = ({ data, pic }) => {
  const { element_count, links, near_earth_objects } = data;
  const [state, setState] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < Object.keys(near_earth_objects).length; i++) {
      for (let c = 0; c < Object.keys(near_earth_objects)[i].length; c++) {
        if (
          near_earth_objects[Object.keys(near_earth_objects)[i]][c] !==
          undefined
        ) {
          arr.push(near_earth_objects[Object.keys(near_earth_objects)[i]][c]);
        } else {
          break;
        }
      }
    }
    setState(arr);
  }, []);

  console.log(state);
  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <Body />
      {state && state.map((e) => <AsteroidInfo key={e.id} id={e.id} />)}
    </div>
  );
};
export default Home;
