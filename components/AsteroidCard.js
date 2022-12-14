import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidCard.module.scss';
import { useContext, useEffect } from 'react';
import { CustomContext } from './Context';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Image from 'next/image';

const AsteroidCard = ({ data }) => {
  const {
    fetch,
    setFetch,
    itemsPerPage,
    setitemsPerPage,
    normalDate,
    space,
    distance,
    addCart,
  } = useContext(CustomContext);

  const time = (date) => {
    const res = date.split('-');
    const time = res[2].split(' ');
    return time[1];
  };

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
  const currentItem = data.close_approach_data.slice(
    firstItemIndex,
    lastItemIndex,
  );

  return (
    <div className={wrapper.grid}>
      {currentItem.map((e) => (
        <div key={e.close_approach_date_full} className={style.AsteroidInfo}>
          {normalDate(e.close_approach_date)}
          <div className={style.AsteroidInfo_body}>
            <div className={style.AsteroidInfo_body_image}>
              {data.is_potentially_hazardous_asteroid ? (
                <Image
                  src={danger}
                  width={93}
                  height={95}
                  placeholder='blur'
                  alt='danger'
                />
              ) : (
                <Image src={podlet} placeholder='blur' alt='podlet' />
              )}
            </div>
            <ul className={style.AsteroidInfo_body_info}>
              <li className={style.AsteroidInfo_body_name}>
                ???????????????? {data.name}
              </li>
              <li className={style.AsteroidInfo_body_size}>
                ??{' '}
                {Math.ceil(
                  data.estimated_diameter.meters.estimated_diameter_max,
                )}{' '}
                ??
              </li>
              <li className={style.AsteroidInfo_body_size}>
                ??? {space(Math.ceil(e.miss_distance[distance]))}{' '}
                {distance === 'lunar' ? '???????????? ??????????' : '????'}
              </li>
              <li className={style.AsteroidInfo_body_danger}>
                {data.is_potentially_hazardous_asteroid
                  ? '????????????'
                  : '???? ????????????'}
              </li>
            </ul>
          </div>
          <ul className={style.AsteroidInfo_body_info_opt}>
            <li className={style.orbiting_body}>???????????? {e.orbiting_body}</li>

            <li className={style.time}>
              ?????????? {time(e.close_approach_date_full)}
            </li>
            <li className={style.time}>
              ???????????????? {Math.round(e.relative_velocity.kilometers_per_hour)}{' '}
              ????/??
            </li>
          </ul>
          <div className={style.AsteroidInfo_btn}>
            <button
              onClick={() =>
                addCart({
                  name: data.name,
                  date: e.close_approach_date,
                  danger: data.is_potentially_hazardous_asteroid,
                  diametr:
                    data.estimated_diameter.meters.estimated_diameter_max,
                  dist: e.miss_distance,
                })
              }
            >
              ????????????????????
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AsteroidCard;
