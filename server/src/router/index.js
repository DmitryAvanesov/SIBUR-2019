const Router = require('koa-router');
const fs = require('fs');
const csv = require('csv-parser');
// const { spawn } = require('child_process');
const router = new Router();

router
    .get('/main', async (ctx) => {
        ctx.body = getHTML();
        ctx.status = 200;
        ctx.type = 'text/html';
    });


module.exports = router;


function rewrite(json, path){
    // console.log(json);

    fs.writeFile(path, json, function(err) {

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
    <header class="page-header d-flex">
        <img src="media/logo.jpg" class="logo align-self-center ml-5" />
    </header>

    <main class="container">
        <div class="row">
            <h2 class="sub-title ml-5 mt-5">
                Catalytic activity chart
            </h2>
        </div>

        <div class="row">
            <div id="chart" class="col ml-5 mt-3"></div>
        </div>

        <div class="row mt-5">
            <h2 class="sub-title col-6 ml-5 mt-5">
                Specific attributes chart
            </h2>

            <div class="col-6 btn-group mt-3">
                <div class="dropdown dropdown-classification">
                    <button class="btn btn-secondary dropdown-toggle ml-5 mr-5" type="button" id="dropdownMenuButtonClassification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="chosen-item ml-5">-</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    </div>
                </div>

                <div class="dropdown dropdown-group">
                    <button class="btn btn-secondary dropdown-toggle mr-5" type="button" id="dropdownMenuButtonGroup" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="chosen-item">-</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    </div>
                </div>

                <div class="dropdown dropdown-attribute">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonAttribute" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="chosen-item">-</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    </div>
                </div>
            </div>

            <div id="subChart" class="col-12 ml-5 mt-3"></div>
        </div>
    </main>

    <footer class="container-fluid text-right bg-light py-3 mt-5 font-weight-bold page-footer">
        SIBUR, 2019
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


let int = setInterval(function(){
    var results = [];
    var results_2 = [];
    fs.createReadStream('public/data/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            var obj = {};
            var json;
            // console.log(results);
            obj["data"] = results;
            json = JSON.stringify(obj);
            // console.log(json);
            rewrite(json, "public/data/data.json");
            
    });
    fs.createReadStream('public/data/prediction.csv')
        .pipe(csv())
        .on('data', (data) => results_2.push(data))
        .on('end', () => {
            var obj = {};
            var json;
            obj["data"] = results_2;
            json = JSON.stringify(obj);
            rewrite(json, "public/data/prediction.json");
            
    });

}, 1500);