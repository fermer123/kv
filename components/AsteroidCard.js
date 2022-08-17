import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidCard.module.scss';
import { useContext, useEffect } from 'react';
import { CustomContext } from './Context';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Image from 'next/image';

const AsteroidCard = ({ data }) => {
  const { distance } = useContext(CustomContext);

  const time = (date) => {
    const res = date.split('-');
    const time = res[2].split(' ');

    return time[1];
  };

  const { fetch, setFetch, itemsPerPage, setitemsPerPage, normalDate, space } =
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
                ↔ {space(Math.ceil(e.miss_distance[distance]))}{' '}
                {distance === 'lunar' ? 'лунных орбит' : 'км'}
              </li>
              <li className={style.AsteroidInfo_body_danger}>
                {data.is_potentially_hazardous_asteroid
                  ? 'Опасен'
                  : 'Не опасен'}
              </li>
            </ul>
          </div>
          <ul className={style.AsteroidInfo_body_info_opt}>
            <li className={style.orbiting_body}>Орбита {e.orbiting_body}</li>

            <li className={style.time}>
              Время {time(e.close_approach_date_full)}
            </li>
            <li className={style.time}>
              Скорость {Math.round(e.relative_velocity.kilometers_per_hour)}{' '}
              км/ч
            </li>
          </ul>
          <div className={style.AsteroidInfo_btn}>
            <button>уничтожить</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AsteroidCard;
