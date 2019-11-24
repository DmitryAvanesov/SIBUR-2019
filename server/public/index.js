"use strict";

var charts = [];

var titleText = ["График активности катализатора", "Температурный режим"];
var buttonText = ["Классификация", "Группа признаков", "Признак"];

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
};

var limits = {
    'f17': 347.6713429093361,
    'f18': 347.0468672513962,
    'f19': 345.08644527196884,
    'f38': 344.2404544353485,
    'f39': 344.16965767741203,
    'f40': 344.84897235035896,
    'f41': 344.23028895258904,
    'f45': 344.6773652136326,
    'f46': 339.0474087893963,
    'f47': 339.11603105068207,
    'f48': 338.15083983540535,
    'f49': 340.20320078730583,
    'f50': 343.423761934042,
    'f51': 336.5848099887371,
    'f52': 336.4985717535019
};

document.addEventListener("DOMContentLoaded", function () {
    var updateRate = 5000;

    updateData();
    selectInit();
    setInterval(updateData, updateRate);
});

function selectInit() {
    var buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = buttonText[i];
    }

    var subTitles = document.querySelectorAll("h2.sub-title");
    for (let i = 0; i < subTitles.length; i++) {
        subTitles[i].innerHTML = titleText[i];
    }

    for (var element in subChartData) {
        var newDropdownItem = document.createElement("div");
        var classificationMenu = document.querySelector(".dropdown-classification > .dropdown-menu");

        newDropdownItem.className = "dropdown-item";
        newDropdownItem.id = element;
        newDropdownItem.innerHTML = element;
        classificationMenu.appendChild(newDropdownItem);

        newDropdownItem.addEventListener("click", function () {
            document.querySelector("#dropdownMenuButtonClassification").nextElementSibling.innerHTML = event.target.innerHTML;

            var groupMenu = document.querySelector(".dropdown-group > .dropdown-menu");
            groupMenu.innerHTML = '';
            var chosenClassification = this.id;

            for (var elem in subChartData[event.target.id]) {
                var newDropdownItem = document.createElement("div");

                newDropdownItem.className = "dropdown-item";
                newDropdownItem.id = elem;
                newDropdownItem.innerHTML = elem;
                groupMenu.appendChild(newDropdownItem);

                newDropdownItem.addEventListener("click", function () {
                    document.querySelector("#dropdownMenuButtonGroup").nextElementSibling.innerHTML = event.target.innerHTML;

                    var attributeMenu = document.querySelector(".dropdown-attribute > .dropdown-menu");
                    attributeMenu.innerHTML = '';

                    console.log(subChartData, subChartData[chosenClassification], chosenClassification);
                    for (var el of subChartData[chosenClassification][event.target.id]) {
                        var newDropdownItem = document.createElement("div");

                        newDropdownItem.className = "dropdown-item";
                        newDropdownItem.id = el;
                        newDropdownItem.innerHTML = names[el];
                        attributeMenu.appendChild(newDropdownItem);

                        newDropdownItem.addEventListener("click", function () {
                            document.querySelector("#dropdownMenuButtonAttribute").nextElementSibling.innerHTML = event.target.innerHTML;

                            charts = [this.id];
                            console.log(charts, subChartData, subChartData[chosenClassification])
                            updateData();
                        })
                    }
                })
            }
        })
    }
}

async function updateData() {
    let response = await fetch('./data/data.json');
    let parsed = await response.json();
    let csvData = await parsed.data;

    let predictionResponse = await fetch('./data/prediction.json');
    let predParsed = await predictionResponse.json();
    let predData = await predParsed.data;

    drawChart(csvData, predData, ["activity"], "chart");
    if (charts != undefined) {
        drawChart(csvData, predData, charts, "subChart");
    }
}

function drawChart(csvData, predictionData, attrArray, tagId) {
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
        predictionData.forEach(function (csvDataItem) {
            if (csvDataItem[attrArrayItem] < minValue) {
                minValue = csvDataItem[attrArrayItem];
            }
            if (csvDataItem[attrArrayItem] > maxValue) {
                maxValue = csvDataItem[attrArrayItem];
            }
        });
    });

    var data = createRandomData(csvData.length, [minValue * (1 - rangeCoef), maxValue * (1 + rangeCoef)], csvData[0].date);
    var data2 = createRandomData(predictionData.length, [minValue * (1 - rangeCoef), maxValue * (1 + rangeCoef)], predictionData[0].date);
    var maxDataLimit = createRandomData(predictionData.length + csvData.length, [(maxValue + 1) * (1 - rangeCoef), (maxValue + 1) * (1 + rangeCoef)], csvData[0].date);
    //var minDataLimit = createRandomData(predictionData.length + csvData.length, [(maxValue + 1) * (1 - rangeCoef), (maxValue + 1) * (1 + rangeCoef)], csvData[0].date);
    var chart = d3_timeseries();

    attrArray.forEach(function (attrArrayItem) {
        for (let i = 0; i < csvData.length; i++) {
            data[i][attrArrayItem] = csvData[i][attrArrayItem];
            maxDataLimit[i][attrArrayItem] = limits[attrArrayItem];
            //minDataLimit[i][attrArrayItem] = minValue;
        }
        for (let i = 0; i < predictionData.length; i++) {
            data2[i][attrArrayItem] = predictionData[i][attrArrayItem];
            data2[i].ci_up = predictionData[i][attrArrayItem] * 1.09;
            data2[i].ci_down = predictionData[i][attrArrayItem] * 0.91;
            maxDataLimit[csvData.length + i][attrArrayItem] = limits[attrArrayItem];
            //minDataLimit[csvData.length + i][attrArrayItem] = minValue;
        }

        const minMaxColor = "#37898C";

        chart.addSerie(data.slice(csvData.length - timeInterval), { x: 'date', y: attrArrayItem }, { interpolate: 'linear', color: "#a6cee3", label: names[attrArrayItem] }).width(800).height(400);
        chart.addSerie(maxDataLimit.slice(csvData.length - timeInterval), { x: 'date', y: attrArrayItem }, { interpolate: 'linear', color: minMaxColor, label: "Max limit" }).width(800).height(400);
        chart.addSerie(data2.slice(predictionData.length - timeInterval), { x: 'date', y: attrArrayItem, ci_up: 'ci_up', ci_down: 'ci_down' }, { interpolate: 'linear', dashed: true, color: "#008A91", label: names[attrArrayItem] }).width(800).height(400);
        //chart.addSerie(minDataLimit.slice(csvData.length - timeInterval), { x: 'date', y: attrArrayItem }, { interpolate: 'linear', color: minMaxColor, label: "Min limit" }).width(800).height(400);
    });

    chart(`#${tagId}`);
}
