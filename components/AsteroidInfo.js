import style from '../styles/AsteroidInfo.module.scss';
import Image from 'next/image';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CustomContext } from './Context';

const AsteroidInfo = ({ state }) => {
  const { distance } = useContext(CustomContext);
  const {
    id,
    close_approach_data,
    name,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = state;

  const { close_approach_date, miss_distance } = close_approach_data[0];
  const { estimated_diameter_max } = estimated_diameter.meters;

  const normalDate = (date) => {
    const res = date.split('-').reverse();
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    months.indexOf(res[1]);
    console.log(months.findIndex(res[1]));
    return res.join('-');
  };

  return (
    <div className={style.AsteroidInfo}>
      <div className={style.AsteroidInfo_date}>
        {normalDate(close_approach_date)}
      </div>
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
          <Link
            href={{
              pathname: `/${id}`,
            }}
          >
            <li className={style.AsteroidInfo_body_name}>Астеройд {name}</li>
          </Link>
          <li className={style.AsteroidInfo_body_size}>
            Ø {Math.ceil(estimated_diameter_max)} м
          </li>
          <li className={style.AsteroidInfo_body_size}>
            ↔ {Math.ceil(miss_distance[distance])}{' '}
            {distance === 'lunar' ? 'лунных орбит' : 'км'}
          </li>
          <li className={style.AsteroidInfo_body_danger}>
            {is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}
          </li>
        </ul>
      </div>
      <div className={style.AsteroidInfo_btn}>
        <button>уничтожить</button>
      </div>
    </div>
  );
};

export default AsteroidInfo;
