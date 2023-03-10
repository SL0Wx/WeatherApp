import "./currentWeather.css";

const CurrentWeather = ({ data }) => {
    return (
        <div className="weather">
            <div className="header">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="description">{data.weather[0].description}</p>
                </div>
                <img alt="weather" className="weatherIcon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className="content">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameterRow">
                        <span className="parameterLabel">Details</span>
                    </div>
                    <div className="parameterRow">
                        <span className="parameterLabel">Feels like</span>
                        <span className="parameterValue">{Math.round(data.main.feels_like)}°C</span>
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
    )
}

export default CurrentWeather