# weatherman
weather search based on woeid
This application uses WOEID (where on Earth ID) to pull weather information from an API.
It allows the user to search by giving the woeid directly or the name of a known town. 
If name is provided, the application first fetches its woeid then uses it to get weather information.
First the user gets weather forecast for the current day and 5 days ahead. Then a 15-day historical of weather i.e 9 days before current 
day and 5 days after current day.

Application is built with vanilla Javascript (no framework) harnessing the features of esnext and polyfilling where necessary using babel.
UI is built by Bootstrap 4 and HTML5

View demo at http://www.lukorito.com/weather/
