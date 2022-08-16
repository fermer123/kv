import { createContext, useState } from 'react';

export const CustomContext = createContext();
export const Context = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState('kilometers');
  const [itemsPerPage, setitemsPerPage] = useState(9);
  const [fetch, setFetch] = useState(false);

  const checkDistanse = (value) => {
    setDistance(value);
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
  };
  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
