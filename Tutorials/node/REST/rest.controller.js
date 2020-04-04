var mysql = require('mysql');
var express = require('express');
var app = express();
// https://stackoverflow.com/questions/10914751/loading-node-js-modules-dynamically-based-on-route

//EXPRESS
app.listen(8080, () => {
    console.log('Server running on port 8080');
});
app.get('/fxpar', (req, res, next) => {
    insert(req, res);
});
app.get('/*', (req, res, next) => {
    res.sendFile(req.url === "/" ? "index.html" : req.url, { root: __dirname });
    console.log(req.url);
});

function respond(res, code, text) {
    res.writeHead(code, { "Content-Type": "text/plain" });
    res.write(text);
    res.end();
}

//MYSQL
var con = mysql.createConnection({
    host: "localhost",
    user: "inversion",
    database: "inversion",
    password: ""
});

function mysqlConnection() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!");
    });
}

function mysqlQuery(query) {
    con.query(query, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

//FXPAR
function insert(req, res) {
    // res = createFxPar(req);
    // let query = `insert into inversion.fxpar(idpar, description) values ()`;
    // res.status(201).send({id: 'abc'});
    respond(res, 200, "{id: 'abc'}");
};

function createFxPar(fxpar) {
    // mysqlConnection();
};
