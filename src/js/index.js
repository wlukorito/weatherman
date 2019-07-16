// MAIN CONTROLLER 
import Search from './models/Search';
import * as searchView from './views/searchView'
import {dom} from './views/domSelector';
import {isNum, decDate, dateFormatter} from '../js/utilities';
import * as highchartView from './views/highchartView';

console.log('Welcome to Weather by Luko');

const state = {};

/* SEARCH CONTROLLER */

const controlSearch = async (isLoad) =>{
    let woeid;
    if(isLoad) {
        woeid = 1528488; //default place Nairobi
    } else {
        woeid = searchView.getInput();
    }
    //if woeid, parse to int
    woeid = isNum(woeid)? parseInt(woeid, 10) : woeid;
    if(woeid){
        searchView.renderLoader();
        state.search = new Search(woeid); //44418 london
        try{
            await state.search.getWeather();
            searchView.updateSummary(state.search.weather);
            searchView.updateForecast(state.search.weather.consolidated_weather);
            //render highchart loader
            controlHighchart();
        }catch(e){
            console.log('Oh Snap! Shit happened! ' + e.message);
            searchView.clearLoader();
            // TODO
            // Handle various errors and render on UI
            // Add error handler in searchView
            // 404 - Oopsy! We couldn't get that place on Earth. Please check for typo
            // 500 - Oh snap!:( Something terrible happened to our request. Sound the alarm!!
            // 522??
        }
    }
}


/**HIGHCHART CONTROLLER */
const controlHighchart = async () => {
    state.temperature = [];
    state.wind = [];
    state.humidity = [];
    state.categories = [];
    console.log('Fetching historical weather data...');
    let daysBack = 9; //get from UI instead: user to select how far back to go
    let today = new Date();
    while(daysBack > 0){
        let current = decDate(today, daysBack);
        current = dateFormatter(current, 'yyyy/mm/dd');
        state.categories.push(current.slice(5));

        try{
            const singleDay = await state.search.singleDateWeather(current);
            
            state.temperature.push(singleDay.temperature);
            state.humidity.push(singleDay.humidity);
            state.wind.push(singleDay.wind);
        }
        catch(e){
            console.log(e.message);
            searchView.clearLoader();
        }

        daysBack--;
    }

    const initReslt = state.search.weather.consolidated_weather; //array 6
    for(let i = 0; i < initReslt.length; i++){
        state.temperature.push(Math.floor((initReslt[i].max_temp + initReslt[i].min_temp)*0.5));
        state.humidity.push(Math.floor(initReslt[i].humidity));
        state.wind.push(Math.floor(initReslt[i].wind_speed));
        
        let aplDate = initReslt[i].applicable_date;
        aplDate = aplDate.split('-').join('/').slice(5);
        state.categories.push(aplDate);
    }

    const x_axis = {
        categories: state.categories
    };

    const series = [
        {
            name: 'Temperature',
            data: state.temperature
        },
        {
            name: 'Humidity',
            data: state.humidity
        },
        {
            name: 'Wind',
            data: state.wind
        }
    ];
    //searchView.clearLoader();
    highchartView.renderHighchart(series, x_axis);
}

dom.searchBtn.addEventListener('click', event => {
    event.preventDefault();
    controlSearch(false);
    console.log(dom.searchBox.value);
});

window.addEventListener('load', event =>{
    controlSearch(true);
});

console.log('Waiting for data...or not');