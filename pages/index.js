import { useContext, useEffect, useState } from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import AsteroidInfo from '../components/AsteroidInfo';
import { CustomContext } from '../components/Context';
import Footer from '../components/Footer';

const key = 'mQzujJfzbi1rzZeOq8XuJYgSI4P8qGevjZCYrVzZ';
const date = new Date();
const dateNow =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

export const getStaticProps = async () => {
  const pic = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const res = await pic.json();

  const resp = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateNow}&api_key=${key}`,
  );

  const data = await resp.json();

  const arr = [];
  for (let i = 0; i < Object.keys(data.near_earth_objects).length; i++) {
    for (let c = 0; c < Object.keys(data.near_earth_objects)[i].length; c++) {
      if (
        data.near_earth_objects[Object.keys(data.near_earth_objects)[i]][c] !==
        undefined
      ) {
        arr.push(
          data.near_earth_objects[Object.keys(data.near_earth_objects)[i]][c],
        );
      } else {
        break;
      }
    }
  }

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
      data: arr,
      pic: res,
    },
  };
};

const Home = ({ data, pic }) => {
  const { checked, distance, fetch, setFetch, itemsPerPage, setitemsPerPage } =
    useContext(CustomContext);

  const lastItemIndex = itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      80
    ) {
      setFetch(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetch) {
      setitemsPerPage((itemsPerPage += 3));
    }
    setFetch(false);
  }, [fetch]);

  const currentItem = data.slice(firstItemIndex, lastItemIndex);

  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <Body />
      <div className={wrapper.grid}>
        {checked
          ? currentItem
              .filter((e) => e.is_potentially_hazardous_asteroid === true)
              .map((e) => <AsteroidInfo key={e.id} state={e} />)
          : currentItem.map((e) => <AsteroidInfo key={e.id} state={e} />)}
      </div>
      <Footer cart={false} />
    </div>
  );
};
export default Home;
