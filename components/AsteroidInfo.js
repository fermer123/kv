import style from '../styles/AsteroidInfo.module.scss';
import Image from 'next/image';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import Link from 'next/link';
import React from 'react';

const AsteroidInfo = ({ state, distance }) => {
  const {
    id,
    close_approach_data,
    name,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = state;

  const { close_approach_date, miss_distance } = close_approach_data[0];
  const { estimated_diameter_max } = estimated_diameter.meters;

  const MyName = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        Click Me
      </a>
    );
  });

  return (
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
          <Link href={`/${id}`}>
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
