import wrapper from '../styles/Home.module.scss';
import style from '../styles/Body.module.scss';
import { useContext } from 'react';
import { CustomContext } from './Context';

const Body = ({ all }) => {
  const { checked, checkbox, checkDistanse } = useContext(CustomContext);
  console.log(all);
  return (
    <div className={wrapper.wrapper}>
      <div className={style.body}>
        <h1>Ближайшие подлёты</h1>
        <div className={style.body_select_atr}>
          <div className={style.body_select}>
            Отображать расстояние: в{' '}
            <button
              onClick={() => checkDistanse('kilometers')}
              className={style.body_btn}
            >
              километрах
            </button>{' '}
            | в{' '}
            <button
              onClick={() => checkDistanse('lunar')}
              className={style.body_btn}
            >
              лунных орбитах
            </button>
          </div>
          {all ? (
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
          ) : (
            ' '
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
