import { useContext, useEffect, useState } from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import AsteroidInfo from '../components/AsteroidInfo';
import { CustomContext } from '../components/Context';

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
  const { state, checked, distance, checkbox, checkDistanse, setState } =
    useContext(CustomContext);

  useEffect(() => {
    const changeDanger = (checked) => {
      if (checked) {
        setState(
          data.filter((e) => e.is_potentially_hazardous_asteroid === true),
        );
      } else setState(data);
    };

    changeDanger(checked);
  }, [data, checked, distance]);

  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <Body
        checked={checked}
        checkbox={checkbox}
        checkDistanse={checkDistanse}
        all={true}
      />
      <div className={wrapper.grid}>
        {state &&
          state.map((e) => (
            <AsteroidInfo key={e.id} state={e} distance={distance} />
          ))}
      </div>
    </div>
  );
};
export default Home;
