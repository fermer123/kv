import wrapper from '../styles/Home.module.scss';
import style from '../styles/Body.module.scss';

const Body = ({ checked, checkbox }) => {
  return (
    <div className={wrapper.wrapper}>
      <div className={style.body}>
        <h1>Ближайшие подлёты</h1>
        <div className={style.body_select_atr}>
          <div className={style.body_select}>
            Отображать расстояние: в{' '}
            <button className={style.body_btn}>километрах</button> | в{' '}
            <button className={style.body_btn}>лунных орбитах</button>
          </div>
          <div className={style.body_btn_danger}>
            <input
              className={style.body_btn_danger_btn}
              type='checkbox'
              value={checked}
              onChange={checkbox}
            />
            <div className={style.body_btn_danger_desc}>
              Показать только опасные
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
