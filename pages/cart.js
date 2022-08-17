import Footer from '../components/Footer';
import Head from '../components/Head';
import wrapper from '../styles/Home.module.scss';
import CartItem from '../components/CartItem';

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
  return (
    <div className={wrapper.wrapper}>
      <Head data={pic} />
      <CartItem />
      <Footer cart={true} />
    </div>
  );
};

export default Cart;
