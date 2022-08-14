import wrapper from '../styles/Home.module.scss';
import style from '../styles/AsteroidInfo.module.scss';
import Image from 'next/image';
import danger from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';

const AsteroidInfo = ({ state }) => {
  const {
    close_approach_data,
    name,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = state;

  const { close_approach_date } = close_approach_data[0];
  const { estimated_diameter_max } = estimated_diameter.meters;

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
          <div className={style.AsteroidInfo_body_info}>
            <div className={style.AsteroidInfo_body_name}>{name}</div>
            <div className={style.AsteroidInfo_body_size}>
              Ø {Math.ceil(estimated_diameter_max)} м
            </div>
            <div className={style.AsteroidInfo_body_size}>↔ {name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsteroidInfo;
//{is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}
