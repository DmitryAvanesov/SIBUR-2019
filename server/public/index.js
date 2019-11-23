"use strict";

var charts;

var subChartData = {
    'Группировка по реактору': {
        'Реактор 1': ['f17', 'f39', 'f41', 'f46', 'f47'],
        'Реактор 2': ['f18', 'f50', 'f51', 'f52'],
        'Реактор 3': ['f19', 'f40', 'f48', 'f49']
    },
    'Группировка по типу': {
        'susp': ['f39', 'f40', 'f41', 'f45', 'f50'],
        'area': ['f17', 'f18', 'f19'],
        'long': ['f46', 'f51', 'f48'],
        'short': ['f47', 'f52', 'f49']
    }
}

var names = {
    'f0': 'Уровень донора в нефрасe ',
    'f1': 'Тем-ра пропилена к к.201',
    'f2': 'Расход пропилена к R1',
    'f3': 'Расход водорода к R1',
    'f4': 'Расход катализатора в R1',
    'f5': 'Расход донора к R1',
    'f6': 'Давление пропилена на входе',
    'f7': 'Давление в газовой фазе реактора R1',
    'f8': 'R1 Объемная доля пропана',
    'f9': 'R1 Объемная доля водорода',
    'f10': 'Расход пропилена к R2',
    'f11': 'Расход водорода к R2',
    'f12': 'Расход катализатора в R2',
    'f13': 'Расход донора к R2',
    'f14': 'Давление в газовой фазе реактора R2',
    'f15': 'R2 Объемная доля пропана',
    'f16': 'R2 Объемная доля водорода',
    'f17': 'Температура реакционной среды в R1',
    'f18': 'Температура реакционной среды в R2',
    'f19': 'Температура реакционной среды в R3',
    'f20': 'Расход нефраса к R1',
    'f21': 'Расход нефраса к R2',
    'f22': 'Расход ТЭА к R1',
    'f23': 'Расход ТЭА к R2',
    'f24': 'Температура в D219',
    'f25': 'R1 Газоанализатор водорода',
    'f26': 'R2 Газоанализатор водорода',
    'f27': 'R3 Газоанализатор водорода',
    'f28': 'ТЭА',
    'f29': 'R1 Ток мешалки',
    'f30': 'R3 Ток мешалки',
    'f31': 'R2 Ток мешалки',
    'f32': 'R1 Уровень',
    'f33': 'R3 Уровень',
    'f34': 'R2 Уровень',
    'f35': 'Давление азота к E3B',
    'f36': 'R3 Перепад давления масло : газ',
    'f37': 'Давление сдувок на этилен',
    'f38': 'Температура деминерализованной воды',
    'f39': 'Температура суспензии внизу R1',
    'f40': 'Температура суспензии внизу R3',
    'f41': 'Температура суспензии в центре R1',
    'f42': 'Температура воздуха',
    'f43': 'Атмосферное давление',
    'f44': 'Влажность воздуха',
    'f45': 'Температура суспензии в центре R3',
    'f46': 'Температура R1 длинный терм.',
    'f47': 'Температура R1 короткий терм.',
    'f48': 'Температура R3 длинный терм.',
    'f49': 'Температура R3 короткий терм.',
    'f50': 'Температура суспензии в центре R2',
    'f51': 'Температура R2 длинный терм.',
    'f52': 'Температура R2 короткий терм.',
    'f53': 'Д18А Датчики веса',
    'f54': 'Д19А Датчики веса',
    'f55': 'Д20А Датчики веса'
}

document.addEventListener("DOMContentLoaded", function () {
    updateData();
    selectInit();
    setInterval(updateData, 5000);
});

function selectInit() {
    for (var element in subChartData) {
        var newDropdownItem = document.createElement("div");
        var classificationMenu = document.querySelector(".dropdown-classification > .dropdown-menu");

        newDropdownItem.className = "dropdown-item";
        newDropdownItem.id = element;
        newDropdownItem.innerHTML = element;
        classificationMenu.appendChild(newDropdownItem);

        newDropdownItem.addEventListener("click", function () {
            var groupMenu = document.querySelector(".dropdown-group > .dropdown-menu");
            groupMenu.innerHTML = '';

            for (var elem in subChartData[event.target.id]) {
                var newDropdownItem = document.createElement("div");
                var currentDict = subChartData[event.target.id];

                newDropdownItem.className = "dropdown-item";
                newDropdownItem.id = elem;
                newDropdownItem.innerHTML = elem;
                groupMenu.appendChild(newDropdownItem);

                newDropdownItem.addEventListener("click", function () {
                    charts = currentDict[event.target.id];
                    updateData();
                })
            }
        })
    }
}

async function updateData() {
    let response = await fetch('./data/data.json');
    let parsed = await response.json();
    let csvData = await parsed.data;

    drawChart(csvData, ["f0"], "chart");
    drawChart(csvData, charts, "subChart");
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

        chart.addSerie(data.slice(csvData.length - timeInterval), { x: 'date', y: attrArrayItem }, { interpolate: 'linear', color: "#a6cee3", label: names[attrArrayItem] }).width(800).height(400);
    });

    chart(`#${tagId}`);
}
