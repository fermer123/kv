import Footer from '../components/Footer';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import CartItem from '../components/CartItem';
import { useContext, useEffect } from 'react';
import { CustomContext } from '../components/Context';
import Body from '../components/Body';

const key = 'mQzujJfzbi1rzZeOq8XuJYgSI4P8qGevjZCYrVzZ';
export const getStaticProps = async () => {
  const pic = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const res = await pic.json();

  if (!res) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pic: res,
    },
  };
};

const Cart = ({ pic }) => {
  const { checked, cart, fetch, setFetch, itemsPerPage, setitemsPerPage } =
    useContext(CustomContext);

  const lastItemIndex = itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      80
    ) {
      setFetch(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetch) {
      setitemsPerPage((itemsPerPage += 3));
    }
    setFetch(false);
  }, [fetch]);

  const currentItem = cart.slice(firstItemIndex, lastItemIndex);

  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <Body />
      {checked
        ? currentItem
            .filter((e) => e.danger === true)
            .map((e) => <CartItem key={e.id} data={e} />)
        : currentItem.map((e) => <CartItem key={e.id} data={e} />)}

      <Footer cart={true} />
    </div>
  );
};

export default Cart;
