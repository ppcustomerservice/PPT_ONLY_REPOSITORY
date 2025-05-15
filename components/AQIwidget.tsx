import "./AQIwidget.css";
import React, { useState, useEffect } from "react";

const AQIWidget = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [aqi, setAqi] = useState<number | null>(null);
  const [pm10, setPm10] = useState<number | null>(null);
  const [pm25, setPm25] = useState<number | null>(null);
  const [weather, setWeather] = useState<{ 
    temp: number; 
    condition: string; 
    windSpeed: number; 
    humidity: number; 
    uvIndex: number 
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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

  const fetchReverseGeocode = async (lat: number, lon: number) => {
    const apiKey = "219f2bc7ab097c9c2fabd29db9ca7193";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return `${data[0].name}, ${data[0].state || data[0].country}`;
      }
      return "Unknown location";
    } catch (err) {
      console.error("Reverse geocode error:", err);
      return "Unknown location";
    }
  };

  const fetchAQIWeather = async (lat: number, lon: number) => {
    const apiKey = "219f2bc7ab097c9c2fabd29db9ca7193";
    setIsLoading(true);
    setError(null);
    
    try {
      const locationName = await fetchReverseGeocode(lat, lon);
      setLocation(locationName);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();
      setWeather({
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        uvIndex: 5
      });

      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const aqiData = await aqiRes.json();
      setAqi(aqiData.list[0].main.aqi);
      setPm10(aqiData.list[0].components.pm10);
      setPm25(aqiData.list[0].components.pm2_5);
    } catch (error) {
      console.error("Error fetching AQI/Weather:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setIsLoading(false);
      setShowSearch(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=219f2bc7ab097c9c2fabd29db9ca7193`
      );
      const data = await response.json();
      if (data.length > 0) {
        await fetchAQIWeather(data[0].lat, data[0].lon);
        setSearchQuery(""); // Clear the search input after successful search
      } else {
        setError("Location not found. Try a different name.");
      }
    } catch (err) {
      setError("Failed to search location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await fetchAQIWeather(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Using default location.");
          fetchAQIWeather(17.6599, 75.9064);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      fetchAQIWeather(17.6599, 75.9064);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="widgetContainer wideShort">
      <div className="cloudContainer movingCloud1">
        <img src="/cloud.png" alt="Cloud" className="cloud" />
      </div>
      
      <div className="content-wrapper">
        <div className="header">
          <div className="tab">🌫️ AQI</div>
          <div className="tab">☀️ Weather</div>
          <div className="header-buttons">
            <button 
              className="locateBtn" 
              onClick={getLocation} 
              disabled={isLoading}
            >
              {isLoading ? "Locating..." : "📍 Locate"}
            </button>
            <button 
              className="searchBtn" 
              onClick={() => setShowSearch(!showSearch)}
              disabled={isLoading}
            >
              🔍 {showSearch ? "Hide" : "Search"}
            </button>
          </div>
        </div>
        
        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name"
              className="search-input"
              onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
            />
            <button
              onClick={handleLocationSearch}
              className="search-submit"
              disabled={isLoading || !searchQuery.trim()}
            >
              {isLoading ? "Searching..." : "Go"}
            </button>
          </div>
        )}
        
        {isLoading && <div className="loading">Loading weather data...</div>}
        {error && <div className="error">{error}</div>}
        
        {!isLoading && !error && (
          <div className="aqiInfo">
            <h2>Real-time Air Quality Index (AQI)</h2>
            <p className="location">{location}</p>
            <p className="updated">Last Updated: Just now</p>
            
            <div className="aqiDisplay">
              <div className="aqiLeft">
                <h1 className="aqiValue">{aqi !== null ? aqi * 50 : "--"}</h1>
                <p className="airQuality">
                  Air Quality is{" "}
                  <span className={aqi !== null ? ["good", "moderate", "poor", "unhealthy", "severe"][aqi - 1] : "--"}>
                    {aqi !== null ? ["Good", "Moderate", "Poor", "Unhealthy", "Severe"][aqi - 1] : "--"}
                  </span>
                </p>
              </div>
              <div className="aqiRight">
                <img className="aqiImage" src={getAQIImage(aqi)} alt="AQI Indicator" />
              </div>
            </div>

            {weather && (
              <div className="weatherPollutantsContainer">
                <div className="weatherCard">
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
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="cloudContainer movingCloud2">
        <img src="/cloud.png" alt="Cloud" className="cloud" />
      </div>
      <div className="cloudContainer movingCloud3">
        <img src="/cloud.png" alt="Cloud" className="cloud" />
      </div>
    </div>
  );
};

export default AQIWidget;