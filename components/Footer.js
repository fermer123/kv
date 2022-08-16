import wrapper from '../styles/Home.module.scss';
import style from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <div className={wrapper.wrapper}>
      <footer className={style.footer}>
        2022 © Все права и планета защищены
      </footer>
    </div>
  );
};

export default Footer;
