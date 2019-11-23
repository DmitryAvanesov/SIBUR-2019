"use strict";

document.addEventListener("DOMContentLoaded", function () {
    setInterval(async () => {
        let response = await fetch('./data/data.json');
        let parsed = await response.json();
        let csvData = await parsed.data;
        await drawChart(csvData);
    }, 5000);
});

function drawChart(csvData) {
    var minValue = 1000000;
    var maxValue = -1000000;
    var rangeCoef = 0.001;

    var currentChart = document.querySelector("#chart");
    currentChart.innerHTML = "";

    csvData.forEach(function (item) {
        if (item.f0 < minValue) {
            minValue = item.f0;
        }
        if (item.f0 > maxValue) {
            maxValue = item.f0;
        }
    });
    console.log(minValue, maxValue);

    var data = createRandomData(csvData.length, [minValue * (1 - rangeCoef), maxValue * (1 + rangeCoef)], csvData[0].date);

    for (let i = 0; i < csvData.length; i++) {
        data[i].n = csvData[i].f0;
    }

    var chart = d3_timeseries()
        .addSerie(data.slice(0, csvData.length), { x: 'date', y: 'n' }, { interpolate: 'linear', color: "#a6cee3", label: "value" })
        .addSerie(data.slice(0, csvData.length),
            { x: 'date', y: 'n3', ci_up: 'ci_up', ci_down: 'ci_down' },
            { interpolate: 'monotone', dashed: true, color: "#a6cee3", label: "prediction" })
        .width(820);

    chart('#chart');
}
