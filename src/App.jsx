  import { useState } from "react";


function App() {
  const [city, setCity] = useState(""); // ciudad que escribe el usuario
  const [weather, setWeather] = useState(null); // datos del clima
  const [error, setError] = useState(null);

  const API_KEY = "3b91a3715f59fac8e812e5cb91440b35"; // reemplaza con tu clave real

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("Ciudad no encontrada ❌");
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError("Error al obtener datos 😢");
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>🌤️ App del Clima</h1>

      <input
        type="text"
        placeholder="Escribe una ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", width: "200px", borderRadius: "5px" }}
      />
      <button
        onClick={fetchWeather}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>

      {/* Mostrar error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar clima si hay datos */}
      {weather && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#003c44ff",
            display: "inline-block",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "250px",
          }}
        >
          <h2>{weather.name} ({weather.sys.country})</h2>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icono clima"
          />
          <p>Viento: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}



export default App;
