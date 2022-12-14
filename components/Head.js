import wrapper from '../styles/Home.module.scss';
import style from '../styles/Head.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CustomContext } from './Context';
import { useContext } from 'react';

const Head = ({ data, onclick }) => {
  const { setChecked } = useContext(CustomContext);
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
                {onclick ? (
                  <button
                    onClick={() => setChecked(false)}
                    className={style.header_button}
                  >
                    Астероиды
                  </button>
                ) : (
                  <button className={style.header_button}>Астероиды</button>
                )}
              </Link>
              <Link href='/cart'>
                <button className={style.header_button}>Заказ</button>
              </Link>
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
