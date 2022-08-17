import style from '../styles/Footer.module.scss';
import { useContext } from 'react';
import { CustomContext } from './Context';

const Footer = ({ cart }) => {
  const { removeItem } = useContext(CustomContext);
  return (
    <footer>
      {cart === true ? (
        <div className={style.footer}>
          <div className={style.AsteroidInfo_btn}>
            <button onClick={() => removeItem()}>
              Заказ бригады им. Брюса Уиллиса на выбранные астероиды
            </button>
          </div>
        </div>
      ) : (
        <div className={style.footer}>2022 © Все права и планета защищены</div>
      )}
    </footer>
  );
};

export default Footer;
