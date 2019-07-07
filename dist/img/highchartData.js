//Highcharts
$(document).ready(function () {
    let chart = {
        height: 400,
        type: 'line'
    };

    let title = {
        text: 'Weather Summary for the Week'
    };
    let subtitle = {
        text: 'Powered by Metaweather'
    };
    let xAxis = {
        categories: ['Day1', 'Day2', 'Day3', 'Day4, Day5']
    };
    let yAxis = {
        title: {
            text: 'Temperature (\xB0C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    let tooltip = {
        valueSuffix: '\xB0C'
    };
    // let legend = {
    //     layout: 'vertical',
    //     align: 'middle',
    //     verticalAlign: 'left',
    //     borderWidth: 0
    // };

    let series = [{
            name: 'Temperature',
            data: [16, 22, 18, 23, 43]
        },
        {
            name: 'Humidity',
            data: [81, 72, 56, 68, 300]
        }
    ];

    const json = {};
    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    //json.legend = legend;
    json.series = series;
    json.chart = chart;

    $('#chart').highcharts(json);

});