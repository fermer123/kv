const AsteroidInfo = ({ data }) => {
  const { id } = data;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default AsteroidInfo;
