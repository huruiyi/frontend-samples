const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


connection.query("select * from test001", function (error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].user_id + "\t\t\t" + results[i].user_name);

    }

})
connection.end();
