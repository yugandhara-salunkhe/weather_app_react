import './forecast.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <>
            <label className="title"> Daily</label>
            {data.list.slice(0, 7).map((item, idx) => (
                <Accordion key={idx}>
                    <AccordionSummary>
                        <div className='daily-item'>
                            <img 
                            alt="weather"
                            className='icon-small' 
                            src={`icons/${item.weather[0].icon}.png`} 
                            />
                            <label className="day">{forecastDays[idx]}</label>
                            <label className="description">{item.weather[0].description}</label>
                            <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='daily-details-grid'>
                            <div className='daily-details-grid-item'>
                                <label>Pressure</label>
                                <label>{item.main.pressure}hPa</label>
                            </div>
                        
                        
                            <div className='daily-details-grid-item'>
                                <label>Humidity</label>
                                <label>{item.main.humidity}%</label>
                            </div>
                        
                        
                            <div className='daily-details-grid-item'>
                                <label>Clouds</label>
                                <label>{item.clouds.all}%</label>
                            </div>
                        
                        
                            <div className='daily-details-grid-item'>
                                <label>Wind Speed:</label>
                                <label>{item.wind.speed}m/s</label>
                            </div>
                        
                        
                            <div className='daily-details-grid-item'>
                                <label>Sea level</label>
                                <label>{item.main.sea_level}m</label>
                            </div>
                        
                        
                            <div className='daily-details-grid-item'>
                                <label>Feels_like</label>
                                <label>{item.main.feels_like}°C</label>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

export default Forecast;