function createRandomData(n, range, date, rand) {
    if (range == null) range = [0, 100];
    if (rand == null) rand = 1 / 20;
    
    var num = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    var num2 = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    var num3 = num;
    var num4 = num;
    var num5 = num;
    var num6 = num;
    var d = new Date(date);
    var data = [];
    var rgen = d3.randomNormal(0, (range[1] - range[0]) * rand);
    for (var i = 0; i < n; i++) {
    data.push({
        date: d,
        n: num,
        n2: num2,
        n3: num3,
        n4: num4,
        n5: num5,
        n6: num6,
        ci_up: num * 1.09,
        ci_down: num * 0.91
    });
    d = new Date(d.getTime() + 60000);
    num = num + rgen();
    num3 = num + rgen() / 3;
    num = Math.min(Math.max(num, range[0]), range[1]);
    num2 = num2 + rgen();
    num2 = Math.min(Math.max(num2, range[0]), range[1]);
    }
    return data;
}