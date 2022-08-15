import AsteroidCard from '../components/AsteroidCard';

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
  // const arr = [];
  // for (let i = 0; i < Object.keys(data.near_earth_objects).length; i++) {
  //   for (let c = 0; c < Object.keys(data.near_earth_objects)[i].length; c++) {
  //     if (
  //       data.near_earth_objects[Object.keys(data.near_earth_objects)[i]][c] !==
  //       undefined
  //     ) {
  //       arr.push(
  //         data.near_earth_objects[Object.keys(data.near_earth_objects)[i]][c],
  //       );
  //     } else {
  //       break;
  //     }
  //   }
  // }

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
      <AsteroidCard data={data} />
    </div>
  );
};

export default Asteroid;
