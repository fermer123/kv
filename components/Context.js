import { createContext, useState } from 'react';

export const CustomContext = createContext();
export const Context = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState('kilometers');
  const [currPage, setCurrPage] = useState(1);

  const checkDistanse = (value) => {
    setDistance(value);
  };

  const value = {
    checked,
    setChecked,
    distance,
    setDistance,

    checkDistanse,
    currPage,
    setCurrPage,
  };
  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
