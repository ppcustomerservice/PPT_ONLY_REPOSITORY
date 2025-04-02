import "./AQIwidget.css";
import React, { useState, useEffect } from "react";

const AQIWidget = () => {
  const [location, setLocation] = useState("Solapur, Maharashtra, India");
  const [aqi, setAqi] = useState<number | null>(null);
  const [pm10, setPm10] = useState<number | null>(null);
  const [pm25, setPm25] = useState<number | null>(null);
  const [weather, setWeather] = useState<{ temp: number; condition: string; windSpeed: number; humidity: number; uvIndex: number; } | null>(null);

  const getAQIImage = (aqiLevel: number | null) => {
    if (aqiLevel === null) return "/neutral.png";
    const images: Record<number, string> = {
      1: "/good.png",
      2: "/neutral.png",
      3: "/sensitive.png",
      4: "/unhealthy.png",
      5: "/poor.png"
    };
    return images[aqiLevel] || "/neutral.jpg";
  };

  const fetchAQIWeather = async (lat: number, lon: number) => {
    const apiKey = "219f2bc7ab097c9c2fabd29db9ca7193";
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const weatherData = await weatherRes.json();
      setWeather({
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        uvIndex: 5
      });
      setLocation(`${weatherData.name}, ${weatherData.sys.country}`);

      const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const aqiData = await aqiRes.json();
      setAqi(aqiData.list[0].main.aqi);
      setPm10(aqiData.list[0].components.pm10);
      setPm25(aqiData.list[0].components.pm2_5);
    } catch (error) {
      console.error("Error fetching AQI/Weather:", error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchAQIWeather(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        console.error("Error fetching location:", err);
        fetchAQIWeather(17.6599, 75.9064); // Fallback to Solapur
      }
    );
  }, []);useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchAQIWeather(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        console.error("Error fetching location:", err);
        fetchAQIWeather(17.6599, 75.9064); // Fallback to Solapur
      }
    );
  }, []);
  
  

  return (
    <div className="widgetContainer wideShort">
      <div className="cloudContainer">
        <img src="/cloud.png" alt="Cloud" className="cloud movingCloud1" />
      </div>
      <div className="header">
        <div className="tab">🌫️ AQI</div>
        <div className="tab">☀️ Weather</div>
        <button
  className="locateBtn"
  onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchAQIWeather(pos.coords.latitude, pos.coords.longitude),
      (err) => console.error("Error fetching location:", err)
    );
  }}
>
  Locate me
</button>

      </div>
      <div className="aqiInfo">
        <h2 style={{ color: "black" }}>Real-time Air Quality Index (AQI)</h2>
        <p className="location">{location}</p>
        <p className="updated">Last Updated: Just now</p>
        <div className="aqiDisplay">
          <div className="aqiLeft">
            <h1 className="aqiValue">{aqi !== null ? aqi * 50 : "--"}</h1>
            <p className="airQuality">Air Quality is <span className={aqi !== null ? ["good", "moderate", "poor", "unhealthy", "severe"][aqi - 1] : "--"}>{aqi !== null ? ["Good", "Moderate", "Poor", "Unhealthy", "Severe"][aqi - 1] : "--"}</span></p>
          </div>
          <div className="aqiRight">
            <img className="aqiImage static" src={getAQIImage(aqi)} alt="AQI Indicator" />
          </div>
        </div>
        <div className="weatherPollutantsContainer">
          {weather && (
            <div className="weatherCard">
              <div className="cloudContainer">
                <img src="/cloud.png" alt="Cloud" className="cloud movingCloud2" />
              </div>
              <div className="weatherDetails">
                <p className="temp">{weather.temp}°C</p>
                <p className="condition">{weather.condition}</p>
                <p>🌬️ Wind Speed: {weather.windSpeed} km/h</p>
                <p>💧 Humidity: {weather.humidity}%</p>
                <p>☀️ UV Index: {weather.uvIndex}</p>
              </div>
              <div className="pmDetails">
                <p>PM10: {pm10 !== null ? `${pm10} µg/m³` : "--"}</p>
                <p>PM2.5: {pm25 !== null ? `${pm25} µg/m³` : "--"}</p>
                <div className="pmScale">
                  <span className="good">Good (0-50)</span>
                  <span className="moderate">Moderate (51-100)</span>
                  <span className="poor">Poor (101-150)</span>
                  <span className="unhealthy">Unhealthy (151-200)</span>
                  <span className="severe">Severe (201-300)</span>
                  <span className="hazardous">Hazardous (301+)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cloudContainer">
        <img src="/cloud.png" alt="Cloud" className="cloud movingCloud3" />
      </div>
    </div>
  );
};

export default AQIWidget;



