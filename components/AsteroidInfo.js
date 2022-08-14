const AsteroidInfo = ({ state }) => {
  const {
    id,
    close_approach_data,
    estimated_diameter,
    is_potentially_hazardous_asteroid,
  } = state;
  const {
    close_approach_date,
    close_approach_date_full,
    miss_distance,
    relative_velocity,
  } = close_approach_data;

  //скорость относительно Земли, время максимального сближения с Землей, расстояние до Земли, по орбите вокруг чего летит.
  console.log(id);
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default AsteroidInfo;
