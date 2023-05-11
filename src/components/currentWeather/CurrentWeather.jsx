import "./currentWeather.css";
import { useState, useEffect } from "react";

const CurrentWeather = ({ data, favorites, setFavorites, celsius, setCelsius }) => {
    const [favorite, setFavorite] = useState(false);

    function handleSetFavorite() {
        if(favorite) {
            setFavorite(false);
            setFavorites(favorites.filter(item => item.label !== data.city));
        } else {
            setFavorite(true);
            setFavorites([...favorites, { value: data.coord.lat + " " + data.coord.lon, label: data.city }]);
        }
    }

    useEffect(() => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].label.includes(data.city)) {
                setFavorite(true);
                break;
            } else {
                setFavorite(false);
            }
        }
    }, [data])

    return (
        <div className="container" style={ favorites.length > 0 ? { width: "40%" } : { width: "90%" }}>
            <div className="weather">
                <div className="header">
                    <div>
                        <p className="city">{data.city}</p>
                        <p className="description">{data.weather[0].description}</p>
                    </div>
                    <img alt="weather" className="weatherIcon" src={`icons/${data.weather[0].icon}.png`} />
                    <div className="tempUnit">
                        <span className="tempC" onClick={() => setCelsius(true)}><b>°C</b></span>
                        <span> / </span>
                        <span className="tempF" onClick={() => setCelsius(false)}><b>°F</b></span>
                    </div>
                    <img alt="favorite" className="favorite" src={`icons/${favorite ? "favoriteSolid.svg" : "favorite.svg"}`} onClick={handleSetFavorite} />
                </div>
                <div className="content">
                    <p className="temperature">{celsius ? Math.round(data.main.temp) + "°C" : Math.round(data.main.temp * 9 / 5 + 32) + "°F"}</p>
                    <div className="details">
                        <div className="parameterRow">
                            <span className="parameterLabel"><b className="detailsLabel">Details</b></span>
                        </div>
                        <div className="parameterRow">
                            <span className="parameterLabel">Feels like</span>
                            <span className="parameterValue">{celsius ? Math.round(data.main.feels_like) + "°C" : Math.round(data.main.feels_like * 9 / 5 + 32) + "°F"}</span>
                        </div>
                        <div className="parameterRow">
                            <span className="parameterLabel">Wind</span>
                            <span className="parameterValue">{data.wind.speed} m/s</span>
                        </div>
                        <div className="parameterRow">
                            <span className="parameterLabel">Humidity</span>
                            <span className="parameterValue">{data.main.humidity}%</span>
                        </div>
                        <div className="parameterRow">
                            <span className="parameterLabel">Pressure</span>
                            <span className="parameterValue">{data.main.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather