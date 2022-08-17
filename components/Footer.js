import wrapper from '../styles/Home.module.scss';
import style from '../styles/Footer.module.scss';

const Footer = (cart) => {
  console.log(cart);
  return (
    <footer className={wrapper.wrapper}>
      {cart === true ? (
        <div className={style.footer}>Заказ бригады им. Брюса Уиллиса.</div>
      ) : (
        <div className={style.footer}>2022 © Все права и планета защищены</div>
      )}
    </footer>
  );
};

export default Footer;
