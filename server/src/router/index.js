const Router = require('koa-router');
const fs = require('fs');
const csv = require('csv-parser');
const router = new Router();

router
    .get('/main', async (ctx) => {
        var results = [];
        var obj = {};
        var json;
        var html;
        var cond = false;
        fs.createReadStream('public/data/data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
                obj["data"] = results;
                json = JSON.stringify(obj);
                console.log(json);
                rewrite(json);
            });
        // var d = { data : results };
        // console.log(d);
        // console.log(results);
        // var json = JSON.stringify(d);
        // console.log(json);
        // fs.readFile('public/index.html', 'utf8', function (err, contents) {
        //     console.log(contents);
        // });
        ctx.body = getHTML();
        ctx.status = 200;
        ctx.type = 'text/html';
    });


module.exports = router;


function rewrite(json){
    console.log(json);

    fs.writeFile("public/data/data.json", json, function(err) {

        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

function getHTML(){
    
var html = `<!DOCTYPE html>

<html>

<head>
    <!-- Meta/title -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Web-Frontend11</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="d3_resources/d3_timeseries.min.css" />

    <link rel="stylesheet" type="text/css" href="index.css" />

    <!-- Web fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>

<body>
    <header></header>

    <main class="container-fluid">
        <div id="chart"></div>
    </main>

    <footer class="container-fluid text-center bg-light py-3 page-footer">
        I am still sticky. With flexbox.
    </footer>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <script src="d3_resources/d3.min.js"></script>
    <script src="d3_resources/d3_timeseries.min.js"></script>
    <script src="d3_resources/create-example-data.js"></script>


    
    <script src="index.js"></script>
</body>

</html>`;
return html;
}