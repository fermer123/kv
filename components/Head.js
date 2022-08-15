import wrapper from '../styles/Home.module.scss';
import style from '../styles/Head.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Head = ({ data }) => {
  return (
    <header className={wrapper.wrapper}>
      <div className={style.header}>
        <div className={style.header_image}>
          {data.url && (
            <Image
              src={String(data.url)}
              alt='/'
              objectFit='cover'
              layout='fill'
              placeholder='empty'
              priority='lazy'
            />
          )}
        </div>
        <div className={style.header_pos}>
          <div className={style.header_title}>
            <div className={style.header_title_about}>ARMAGGEDON V2</div>
            <div className={style.header_button_group}>
              <Link href='/'>
                <button className={style.header_button}>Астероиды</button>
              </Link>
              <button className={style.header_button}>Заказ</button>
            </div>
          </div>
          <div className={style.header_description}>
            Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.
          </div>
        </div>
      </div>
    </header>
  );
};

export default Head;
