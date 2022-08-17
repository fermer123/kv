import { useContext } from 'react';
import { CustomContext } from './Context';
const CartItem = () => {
  const { cart } = useContext(CustomContext);
  return <div></div>;
};

export default CartItem;
