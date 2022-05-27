import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: {
        q: inputRef.current.value || "London, uk",
        units: "metric",
      },
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "a424272088msha4c77c8350c290ap18477ajsndf2d6de826c0",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeatherInfo(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [weatherInfo]);

  const determineBackgroundImage = () => {
    if (weatherInfo?.current?.feelslike_c < 10) {
      setImage(
        "https://midamericaortho.com/templates/yootheme/cache/raynauds-phenomenon-or-disease-7a011c40.jpeg"
      );
    }
    if (weatherInfo?.current?.feelslike_c >= 10) {
      setImage(
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/iStock-104472907-ec1d53a7c5724086414f13ae0dab8e1b.jpg"
      );
    }
  };
  return (
    <div className="app" style={{ backgroundImage: `url(${image})` }}>
      <div className="app_container">
        <div className="app_left">
          <h2>hello</h2>
          <form>
            <input ref={inputRef} type="text" placeholder="Type the city" />
            <button onClick={fetchWeatherInfo} type="submit">
              Show me the weather
            </button>
          </form>
        </div>
        <div className="app_right">
          <h2>{weatherInfo?.location?.name}</h2>
          <h3>{weatherInfo?.current?.feelslike_c} deg cel</h3>
          <h3>
            {weatherInfo &&
              `Sunrise: ${moment
                .unix(weatherInfo?.location?.localtime_epoch)
                .format("llll")}`}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
