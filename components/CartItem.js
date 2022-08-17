import dang from '../public/danger.jpg';
import podlet from '../public/podlet.jpg';
import style from '../styles/Cart.module.scss';
import Image from 'next/image';
import { useContext } from 'react';
import { CustomContext } from './Context';

const CartItem = ({ data }) => {
  const { distance, space, removeItem } = useContext(CustomContext);
  const { id, date, danger, diametr, dist } = data;

  return (
    <div className={style.AsteroidInfo}>
      <div className={style.AsteroidInfo_date}>{date}</div>
      <div className={style.AsteroidInfo_body}>
        <div className={style.AsteroidInfo_body_image}>
          {danger ? (
            <Image
              src={dang}
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
            Ø {Math.ceil(diametr)} м
          </li>
          <li className={style.AsteroidInfo_body_size}>
            ↔ {Math.ceil(dist[distance])}{' '}
            {distance === 'lunar' ? 'лунных орбит' : 'км'}
          </li>
          <li className={style.AsteroidInfo_body_danger}>
            {danger ? 'Опасен' : 'Не опасен'}
          </li>
        </ul>
        <button onClick={() => removeItem()}>as</button>
      </div>
    </div>
  );
};

export default CartItem;
