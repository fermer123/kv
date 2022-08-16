import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidCard.module.scss';
import { useContext, useEffect } from 'react';
import { CustomContext } from './Context';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Image from 'next/image';

const AsteroidCard = ({ data }) => {
  const { distance } = useContext(CustomContext);
  const normalDate = (date) => {
    const res = date.split('-').reverse();
    const months = {
      1: 'января',
      2: 'февраля',
      3: 'марта',
      4: 'апреля',
      5: 'мая',
      6: 'июня',
      7: 'июля',
      8: 'августа',
      9: 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    };
    res[1] =
      months[
        res[1]
          .split('')
          .filter((e) => e[0] !== '0')
          .join('')
      ];
    return res.join(' ');
  };

  const { fetch, setFetch, itemsPerPage, setitemsPerPage } =
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
  const currentItem = data.close_approach_data.slice(
    firstItemIndex,
    lastItemIndex,
  );

  console.log(data);

  // По каждому астероиду: название, размер, оценка опасности,
  //  как близко будет к Земле, точная дата максимального
  //   подлёта. Иконка сближения в зависимости от опасности.
  //    Фильтр по опасности. И
  //    опция вывода расстояний: в километрах или расстояниях до Луны.
  //   //список всех его сближений. // По каждому сближению: скорость
  //   относительно Земли, // время максимального сближения с Землей, //
  //   расстояние до Земли, по орбите вокруг чего летит.

  return (
    <div className={wrapper.grid}>
      {currentItem.map((e) => (
        <div key={e.close_approach_date} className={style.AsteroidInfo}>
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
                Астеройд {data.name}
              </li>
              <li className={style.AsteroidInfo_body_size}>
                Ø{' '}
                {Math.ceil(
                  data.estimated_diameter.meters.estimated_diameter_max,
                )}{' '}
                м
              </li>
              <li className={style.AsteroidInfo_body_size}>
                ↔ {Math.ceil(e.miss_distance[distance])}{' '}
                {distance === 'lunar' ? 'лунных орбит' : 'км'}
              </li>
              <li className={style.AsteroidInfo_body_danger}>
                {data.is_potentially_hazardous_asteroid
                  ? 'Опасен'
                  : 'Не опасен'}
              </li>
            </ul>
          </div>
          <div className={style.AsteroidInfo_btn}>
            <button>уничтожить</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AsteroidCard;
