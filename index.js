"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var data = createRandomData(80, [0, 1000], 0.01)
    // [{date:new Date('2013-01-01'),n:120,n3:200,ci_up:127,ci_down:115},...]

    var chart = d3_timeseries()
        .addSerie(data.slice(0, 60), { x: 'date', y: 'n' }, { interpolate: 'linear', color: "#a6cee3", label: "value" })
        .addSerie(data.slice(50),
            { x: 'date', y: 'n3', ci_up: 'ci_up', ci_down: 'ci_down' },
            { interpolate: 'monotone', dashed: true, color: "#a6cee3", label: "prediction" })
        .width(820)

    chart('#chart')
});

// [{date:new Date('2013-01-01'),n:120,n3:200,ci_up:127,ci_down:115},...]
