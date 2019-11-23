"use strict";

var charts = [["f1", "f2", "f3"]];

document.addEventListener("DOMContentLoaded", function () {
    updateData();
    setInterval(updateData, 5000);
});

async function updateData() {
    let response = await fetch('./data/data.json');
    let parsed = await response.json();
    let csvData = await parsed.data;

    drawChart(csvData, ["f0"], "chart");
    var chartTag = document.querySelector("#chart");

    charts.forEach(function (item) {
        chartTag = chartTag.nextElementSibling;
        drawChart(csvData, item, chartTag.id);
    });
}

function drawChart(csvData, attrArray, tagId) {
    const timeInterval = 1440;

    var minValue = 1000000;
    var maxValue = -1000000;
    var rangeCoef = 0.001;

    var currentChart = document.querySelector(`#${tagId}`);
    currentChart.innerHTML = "";

    attrArray.forEach(function (attrArrayItem) {
        csvData.forEach(function (csvDataItem) {
            if (csvDataItem[attrArrayItem] < minValue) {
                minValue = csvDataItem[attrArrayItem];
            }
            if (csvDataItem[attrArrayItem] > maxValue) {
                maxValue = csvDataItem[attrArrayItem];
            }
        });
        console.log(minValue, maxValue);
    });

    var data = createRandomData(csvData.length, [minValue * (1 - rangeCoef), maxValue * (1 + rangeCoef)], csvData[0].date);
    var chart = d3_timeseries();

    attrArray.forEach(function (attrArrayItem) {
        for (let i = 0; i < csvData.length; i++) {
            data[i][attrArrayItem] = csvData[i][attrArrayItem];
        }

        chart.addSerie(data.slice(csvData.length - timeInterval), { x: 'date', y: attrArrayItem }, { interpolate: 'linear', color: "#a6cee3", label: "value" }).width(800).height(400);
    });

    chart(`#${tagId}`);
}
