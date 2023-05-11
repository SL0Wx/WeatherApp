import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { useState } from "react";
import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data, celsius }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    const forecastData = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32], data.list[39]];

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {forecastData.map((item, i) => (
                        <AccordionItem key={i}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="dailyItem">
                                    <img alt="weather" className="iconSmall" src={`icons/${item.weather[0].icon}.png`} />
                                    <label className="day">{forecastDays[i]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="temp">{celsius ? Math.round(item.main.temp) + "°C" : Math.round(item.main.temp * 9 / 5 + 32) + "°F"}</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="dailyDetailsGrid">
                                <div className="dailyDetailsGridItem">
                                    <label>Pressure:</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="dailyDetailsGridItem">
                                    <label>Humidity:</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="dailyDetailsGridItem">
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="dailyDetailsGridItem">
                                    <label>Feels like:</label>
                                    <label>{celsius ? Math.round(item.main.feels_like) + "°C" : Math.round(item.main.feels_like * 9 / 5 + 32) + "°F"}</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>              
                ))}
                <AccordionItem></AccordionItem>
            </Accordion>
        </>
    )
}

export default Forecast