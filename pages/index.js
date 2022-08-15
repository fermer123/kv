import { useEffect, useState } from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import AsteroidInfo from '../components/AsteroidInfo';

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
  const { element_count, links, near_earth_objects } = data;
  const [state, setState] = useState([]);
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState('kilometers');

  const checkbox = () => {
    setChecked(!checked);
  };

  const checkDistanse = (value) => {
    setDistance(value);
  };

  useEffect(() => {
    // const arr = [];
    // for (let i = 0; i < Object.keys(near_earth_objects).length; i++) {
    //   console.log(Object.keys(near_earth_objects)[i]);
    //   for (let c = 0; c < Object.keys(near_earth_objects)[i].length; c++) {
    //     if (
    //       near_earth_objects[Object.keys(near_earth_objects)[i]][c] !==
    //       undefined
    //     ) {
    //       arr.push(near_earth_objects[Object.keys(near_earth_objects)[i]][c]);
    //     } else {
    //       break;
    //     }
    //   }
    // }
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
