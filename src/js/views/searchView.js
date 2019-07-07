import {dom} from './domSelector';
import {dayDate} from '../utilities';

export const getInput = () => {
    return dom.searchBox.value.toLowerCase();
};

const iconResolver = w_state => {
    const iconClass = {
        'sn': 'far fa-snowflake',
        'sl': 'fas fa-cloud-meatball',
        'h': 'fas fa-cloud-meatball',
        't': 'fas fa-poo-storm',
        'hr': 'fas fa-cloud-showers-heavy',
        'lr': 'fas fa-cloud-rain',
        's': 'fas fa-cloud-sun-rain',
        'hc': 'fas fa-cloud',
        'lc': 'fas fa-cloud-sun',
        'c': 'fas fa-sun'
    };

    return iconClass[w_state];
}


export const updateSummary = weather => {
    dom.placeName.textContent = weather.title;
    let consltd_wthr = weather.consolidated_weather[0];
    
    //let {day, date}= dayDate(consltd_wthr.applicable_date, 'yyyy-mm-dd'); //destructure
    let day= dayDate(consltd_wthr.applicable_date, 'yyyy-mm-dd').day;
    let date = new Date().toString().slice(0, 33);
    dom.dayOfWeek.textContent = day;
    dom.dateTime.textContent = date;
    dom.forecastIcon.innerHTML = `<i class="${iconResolver(consltd_wthr.weather_state_abbr)}"></i>`;
    dom.forecastText.textContent = consltd_wthr.weather_state_name;
    
    let speed = Math.floor(consltd_wthr.wind_speed);
    let dir = consltd_wthr.wind_direction_compass;
    dom.windSpeed.textContent = `${speed} m/s ${dir}`;
    
    let temp = Math.floor((consltd_wthr.max_temp + consltd_wthr.min_temp)/2);
    dom.tempAvg.innerHTML = `${temp}&deg;`;
    dom.tempLowHigh.innerHTML = `${Math.floor(consltd_wthr.max_temp)}&deg;
     ${Math.floor(consltd_wthr.min_temp)}&deg;`;
};

export const updateForecast = cnsld_wthr => {
    for (let i = 1; i < cnsld_wthr.length; i++){
        let dateString = cnsld_wthr[i].applicable_date;
        let date = dayDate(dateString, 'yyyy-mm-dd').day.slice(0,3);
        const markup = `
        <p>${date}</p>
        <p><i class="${iconResolver(cnsld_wthr[i].weather_state_abbr)}"></i></p>
        <p>${Math.floor(cnsld_wthr[i].min_temp)}&deg; ${Math.floor(cnsld_wthr[i].max_temp)}&deg;</p>
        `;

        document.querySelector(`#day${i}`).innerHTML = markup;
    }
};


export const renderLoader = () => {
    const markup = `
    <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    `;

    dom.chartArea.insertAdjacentHTML('afterbegin', markup);
}

export const clearLoader = () => {
    if(dom.chartArea) dom.chartArea.parentElement.removeChild(dom.chartArea);
   // dom.chartArea.innerHTML = '';
}