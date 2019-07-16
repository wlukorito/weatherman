/**
 * Check whether a string is a number
 * @param {*} str 
 * @returns true if str is a number, false otherwise
 */
export const isNum = str => {
    if (/[0-9]/.test(str)) {
        return true;
    }
    return false;
}


/* DATES */

/**
 * Decrement date by n days.
 *  Default returns today-1 i.e yesterday
 * @param {string} ds 
 * date string in mm/dd/yyyy
 * @param {number} n 
 * number of days to decrement by
 * @returns JS date decremented by n number of days 
 */
export const decDate = (ds = null, n = 1) => {
    let start = (ds) ? new Date(ds) : new Date();
    start.setDate(start.getDate() - n);
    return start;
}


/**
 * Get day of week and js date from date string
 * @param {string} dateStr 
 * @param {string} format
 * yyyy mm dd, yyyy dd mm, dd mm yyyy, mm dd yyyy separated by {-,/} 
 * @returns object with name of day and date string truncated to 33 chars
 */
export const dayDate = (dateStr, format) => {
    let fmtArr = format.includes('-') ? format.split('-') : format.split('/');
    let parts = dateStr.includes('-')?  dateStr.split('-') : dateStr.split('/');
   
    let year = parseInt(parts[fmtArr.indexOf('yyyy')], 10); 
    let month = parseInt(parts[fmtArr.indexOf('mm')], 10);
    let day = parseInt(parts[fmtArr.indexOf('dd')], 10);
    
    //months indexed from 0: month-1
    let jsDate = new Date(year, month-1, day);
    let dayNum = jsDate.getDay();
    let date = jsDate.toString().slice(0, 33);
    
    switch(dayNum){
        case 0: return {day: 'Sunday', date};
        case 1: return {day: 'Monday', date};
        case 2: return {day: 'Tuesday', date};
        case 3: return {day: 'Wednesday', date};
        case 4: return {day: 'Thursday', date};
        case 5: return {day: 'Friday', date};
        case 6: return {day: 'Saturday', date};
        default: return 'Invalid Day';
    }
}


/**
 * Format date using yyyy, mm, dd
 * @param {Date} date 
 * JS date
 * @param {string} format 
 * output format like yyyy-mm-dd or dd/mm/yyyy
 * @returns date string in specified format
 */
export const dateFormatter = (date, format) => {
    let day = (date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`; //0 is January
    let year = date.getFullYear();
    format = format.replace('yyyy', year);
    format = format.replace('mm', month);
    format = format.replace('dd', day);

    return format;
}