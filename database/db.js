import mysql from 'mysql2';
import { 
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT } from '../config.js'



const connection =  mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

connection.connect((error)=> {
    if(error){
        console.log('El error de conexion es:'+error);
        return;
    }
    console.log('¡Conectado a la base de datos!');
});

connection.query("CREATE DATABASE _node_login_jwt", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });


export { connection as default };