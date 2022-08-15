import { createContext, useEffect, useState } from 'react';

export const CustomContext = createContext();
export const Context = ({ children }) => {
  const [state, setState] = useState([]);
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState('kilometers');

  const checkbox = () => {
    setChecked(!checked);
  };

  const checkDistanse = (value) => {
    setDistance(value);
  };

  const value = {
    state,
    setState,
    checked,
    setChecked,
    distance,
    setDistance,
    checkbox,
    checkDistanse,
  };
  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
