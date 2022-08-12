import wrapper from '../styles/Home.module.scss';
import style from '../styles/Head.module.scss';
import Image from 'next/image';

const Head = ({ data }) => {
  console.log(data);
  return (
    <header className={wrapper.wrapper}>
      <div className={style.header}>
        <div className={style.header_image}>
          {data && (
            <Image
              src={String(data.url)}
              alt='/'
              objectFit='cover'
              width={1000}
              height={108}
            />
          )}
        </div>
        <div className={style.header_title}>
          <div className={style.header_title_about}>ARMAGGEDON V2</div>
          <div className={style.header_button_group}>
            <div className={style.header_button}>Астероиды</div>
            <div className={style.header_button}>Заказ</div>
          </div>
        </div>
        <div className={style.header_description}>
          Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.
        </div>
      </div>
    </header>
  );
};

export default Head;
