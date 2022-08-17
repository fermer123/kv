import wrapper from '../styles/Home.module.scss';
import style from '../styles/Footer.module.scss';

const Footer = (cart) => {
  console.log(cart);
  return (
    <div className={wrapper.wrapper}>
      {cart ? (
        <footer className={style.footer}>
          Заказ бригады им. Брюса Уиллиса.
        </footer>
      ) : (
        <footer className={style.footer}>
          2022 © Все права и планета защищены
        </footer>
      )}
    </div>
  );
};

export default Footer;
