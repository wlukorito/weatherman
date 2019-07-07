import axios from 'axios';
import {proxy} from '../config';

export default class Search{
    constructor(woeid){
        this.woeid = woeid;
    }

    async getWeather(){
        await this.getWOEID(); //get woeid incase user entered name
        //weather search with woeid
        const result = await axios(`${proxy}/https://www.metaweather.com/api/location/${this.woeid}`);
        this.weather = result.data;
    }

    async getWOEID(){
        if(typeof this.woeid !== 'number'){
            const res = await axios(`${proxy}/https://www.metaweather.com/api/location/search/?query=${this.woeid}`);
            this.woeid =  res.data[0].woeid;
        }
    }

    async singleDateWeather(dateStr){
        const res = await axios(`${proxy}/https://www.metaweather.com/api/location/${this.woeid}/${dateStr}`);
        return {
            temperature: Math.floor((res.data[0].max_temp + res.data[0].min_temp)*0.5),
            humidity: res.data[0].humidity,
            wind: Math.floor(res.data[0].wind_speed)
        };
    }
}