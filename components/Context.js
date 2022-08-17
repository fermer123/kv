import { createContext, useEffect, useState } from 'react';

export const CustomContext = createContext();
export const Context = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState('kilometers');
  const [itemsPerPage, setitemsPerPage] = useState(9);
  const [fetch, setFetch] = useState(false);
  const [cart, setCart] = useState([]);

  const checkDistanse = (value) => {
    setDistance(value);
  };

  useEffect(() => {
    if (localStorage.getItem('cart') !== null) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const normalDate = (date) => {
    const res = date.split('-').reverse();
    const months = {
      1: 'января',
      2: 'февраля',
      3: 'марта',
      4: 'апреля',
      5: 'мая',
      6: 'июня',
      7: 'июля',
      8: 'августа',
      9: 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    };

    res[1] =
      months[
        res[1]
          .split('')
          .filter((e) => e !== '0')
          .join('')
      ];

    return res.join(' ');
  };

  const space = (number) => {
    return String(number)
      .split('')
      .map((e, idx) => (idx % 3 !== 2 ? e : e + ' '))
      .join('');
  };

  const addCart = (item) => {
    // const sameItem = cart.findIndex((e) => e.id === item.id);
    setCart([...cart, item]);
  };
  const removeItem = () => {
    localStorage.removeItem('cart');
    setCart([]);
    alert(
      'Бригада им. Брюса Уиллиса на выбранные астероиды. Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу',
    );
  };

  const value = {
    checked,
    setChecked,
    distance,
    setDistance,
    checkDistanse,
    itemsPerPage,
    setitemsPerPage,
    fetch,
    setFetch,
    normalDate,
    space,
    addCart,
    cart,
    removeItem,
  };
  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
