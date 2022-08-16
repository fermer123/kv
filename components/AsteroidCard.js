import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidCard.module.scss';
import { useContext, useEffect } from 'react';
import { CustomContext } from './Context';
import Asteroid from './Asteroid';

const AsteroidCard = ({ data }) => {
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

  const currentItem = Array(data).slice(firstItemIndex, lastItemIndex);

  return (
    <div className={wrapper.wrapper}>
      <div className={wrapper.grid}>
        {checked
          ? currentItem
              .filter((e) => e.is_potentially_hazardous_asteroid === true)
              .map((e) => <Asteroid key={e.id} data={e} />)
          : currentItem.map((e) => <Asteroid key={e.id} data={e} />)}
      </div>
    </div>
  );
};
export default AsteroidCard;
