
export const renderHighchart = (series, x_axis) => {
    let title = {
        text: 'Evolutive Weather Forecast'
    };

    let subtitle = {
        text: 'Powered by Metaweather'
    };

    let yAxis = {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    const chartData = {};
    chartData.title = title;
    chartData.subtitle = subtitle;
    chartData.yAxis = yAxis;
    chartData.xAxis = x_axis;
    chartData.series = series;
    //add smooth lines i.e spline chart
    Highcharts.seriesTypes.line.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline;
    $('#chart').highcharts(chartData);
}
