import wrapper from '../styles/Home.module.scss';
import style from '../styles/Body.module.scss';
import { useState } from 'react';
const Body = () => {
  const [checked, setChecked] = useState(false);
  const checkbox = () => {
    setChecked(!checked);
  };
  return (
    <div className={wrapper.wrapper}>
      <div className={style.body}>
        <h1 className={style.body_title}>Ближайшие подлёты</h1>
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
