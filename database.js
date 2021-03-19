const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password:'',
    database: 'bdswiss'
});

client.connect();

client.query(`SELECT * FROM users`, (err, results) => {
    if(!err){
        console.log(results.rows);
    }
    client.end();
})