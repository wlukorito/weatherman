//Highcharts
$(document).ready(function () {
    let title = {
        text: 'Weather Summary for the Week'
    };
    let subtitle = {
        text: 'Source is our weather source'
    };
    let xAxis = {
        categories: ['Day1', 'Day2', 'Day3', 'Day4']
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
    //     layout: 'horizontal',
    //     align: 'middle',
    //     verticalAlign: 'bottom',
    //     borderWidth: 0
    // };

    let series = [{
            name: 'Temperature',
            data: [16, 22, 18, 23]
        },
        {
            name: 'Humidity',
            data: [81, 72, 56, 68]
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

    $('#chart').highcharts(json);

});