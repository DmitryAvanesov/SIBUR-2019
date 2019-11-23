"use strict";

document.addEventListener("DOMContentLoaded", function () {
    setInterval(async () => {
        let response = await fetch('./data/data.json');
        // let blob = await response.blob();
        // console.log(response);
        let parsed = await response.json()
        console.log(parsed.data);
        let csvData = parsed.data;
        draw(csvData);

        // var obj = JSON.parse(parsed);
        // console.log(obj);
    }, 10000);
});

function draw(csvData){
    // let csvData = [
    //     { date: "2019-11-23", f0: 40.80091857910156, f1: 40.90091857910156, f2: 40.60091857910156 },
    //     { date: "2019-11-23", f0: 40.7557487487793, f1: 40.50091857910156, f2: 40.60091857910156 },
    //     { date: "2019-11-23", f0: 40.1557487487793, f1: 40.20091857910156, f2: 40.30091857910156 }
    // ];

    var data = createRandomData(3, [40, 41]);

    for (let i = 0; i < 3; i++) {
        data[i].n = csvData[i].f0;
    }

    var chart = d3_timeseries()
        .addSerie(data.slice(0, 3), { x: 'date', y: 'n' }, { interpolate: 'linear', color: "#a6cee3", label: "value" })
        .addSerie(data.slice(0, 3),
            { x: 'date', y: 'n3', ci_up: 'ci_up', ci_down: 'ci_down' },
            { interpolate: 'monotone', dashed: true, color: "#a6cee3", label: "prediction" })
        .width(820)

    chart('#chart');
}

// function readJSON(){
//     setInterval(async () => {
//         let response = await fetch('./data/data.json');
//         // let blob = await response.blob();
//         // console.log(response);
//         let parsed = await response.json()
//         console.log(parsed);
//     }, 10000);

// }



// [{date:new Date('2013-01-01'),n:120,n3:200,ci_up:127,ci_down:115},...]
