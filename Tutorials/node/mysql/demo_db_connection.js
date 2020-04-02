var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "inversion",
    database: "inversion",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");

    con.query("select * from fxpar;", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(fields);
    });
});
