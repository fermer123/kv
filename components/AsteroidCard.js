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

//список всех его сближений.
// По каждому сближению: скорость относительно Земли,
//  время максимального сближения с Землей,
//   расстояние до Земли, по орбите вокруг чего летит.
const AsteroidCard = ({ data }) => {
  const { distance } = useContext(CustomContext);
  const {
    close_approach_data,
    name,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = data;

  const { close_approach_date, miss_distance } = close_approach_data;
  const { estimated_diameter_max } = estimated_diameter.meters;
  const last = close_approach_data.pop().miss_distance;
  console.log(data);
  return (
    <div className={wrapper.wrapper}>
      <div className={style.AsteroidInfo}>
        <div className={style.AsteroidInfo_date}>{close_approach_date}</div>
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
              ↔ {Math.ceil(last[distance])}{' '}
              {distance === 'lunar' ? 'лунных орбит' : 'км'}
            </li>
            <li className={style.AsteroidInfo_body_danger}>
              {is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AsteroidCard;
