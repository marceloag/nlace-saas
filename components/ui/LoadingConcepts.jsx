function LoadingConcepts() {
  const [opacity, setOpacity] = useState('opacity-100');

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-50 z-50 ${opacity} transition-all duration-500 ease-in-out`}
    >
      <div className="card">
        <div className="loader">
          <p>Estamos cargando</p>
          <div className="words">
            <span className="word font-bold">tendencias</span>
            <span className="word font-bold">marcas</span>
            <span className="word font-bold">keywords</span>
            <span className="word font-bold">emojis</span>
            <span className="word font-bold">a la IA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingConcepts;
