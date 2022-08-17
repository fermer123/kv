import { useContext } from 'react';
import { CustomContext } from './Context';
const CartItem = () => {
  const { cart } = useContext(CustomContext);

  return (
    <div>
      {/* {cart.map((e) => (
        <div>{e.id}</div>
      ))} */}
    </div>
  );
};

export default CartItem;
