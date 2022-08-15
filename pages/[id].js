import AsteroidCard from '../components/AsteroidCard';
import Body from '../components/Body';
import Head from '../components/Head';

const key = 'mQzujJfzbi1rzZeOq8XuJYgSI4P8qGevjZCYrVzZ';
const date = new Date();
const dateNow =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  console.log(id);
  const resp = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${key}`,
  );
  const data = await resp.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

const Asteroid = ({ data }) => {
  return (
    <div>
      <Body all={false} />
      <AsteroidCard data={data} />
    </div>
  );
};

export default Asteroid;
