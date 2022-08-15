import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidCard.module.scss';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Image from 'next/image';
import { useContext } from 'react';
import { CustomContext } from './Context';

// По каждому астероиду: название, размер, оценка опасности,
//  как близко будет к Земле, точная дата максимального
//   подлёта. Иконка сближения в зависимости от опасности.
//    Фильтр по опасности. И
//    опция вывода расстояний: в километрах или расстояниях до Луны.

const AsteroidCard = ({ data }) => {
  const { distance } = useContext(CustomContext);
  const {
    close_approach_data,
    name,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = data;
  const { estimated_diameter_max } = estimated_diameter.meters;
  const lastDist = close_approach_data.pop().miss_distance;
  const lastDate = close_approach_data.pop().close_approach_date;

  const normalDate = (date) => {
    const res = date.split('-').reverse();
    const months = [
      'декабря',
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
    ];

    res[1] =
      months[
        res[1]
          .split('')
          .filter((e) => e !== '0')
          .join()
      ];

    return res.join(' ');
  };

  return (
    <div className={wrapper.wrapper}>
      <div className={style.AsteroidInfo}>
        <div className={style.AsteroidInfo_date}>{normalDate(lastDate)}</div>
        <div className={style.AsteroidInfo_body}>
          <div className={style.AsteroidInfo_body_image}>
            {is_potentially_hazardous_asteroid ? (
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
            <li className={style.AsteroidInfo_body_name}>Астеройд {name}</li>

            <li className={style.AsteroidInfo_body_size}>
              Ø {Math.ceil(estimated_diameter_max)} м
            </li>
            <li className={style.AsteroidInfo_body_size}>
              ↔ {Math.ceil(lastDist[distance])}{' '}
              {distance === 'lunar' ? 'лунных орбит' : 'км'}
            </li>
            <li className={style.AsteroidInfo_body_danger}>
              {is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}
            </li>
          </ul>
        </div>
        <ul className={style.close_approach_data}></ul>
      </div>
    </div>
  );
};

export default AsteroidCard;
