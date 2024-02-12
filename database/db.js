import mysql from 'mysql2';
import { 
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT } from '../config.js'

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
});

connection.connect((error)=> {
    if(error){
        console.log('El error de conexion es:'+error);
        return;
    }
    console.log('¡Conectado a MySQL!');
    
    // Crear base de datos
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, function (err, result) {
        if (err) throw err;
        console.log(`Base de datos "${DB_NAME}" creada o ya existente`);
        
        // Utilizar la base de datos
        connection.query(`USE ${DB_NAME}`, function (err, result) {
            if (err) throw err;
            console.log(`Usando la base de datos "${DB_NAME}"`);
            
            // Crear tabla
            const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user VARCHAR(255),
                name VARCHAR(255),
                pass VARCHAR(255)
            )`;

            connection.query(createTableQuery, function (err, result) {
                if (err) throw err;
                console.log("Tabla 'users' creada o ya existente");
                //connection.end(); // Cerrar la conexión una vez que las operaciones hayan finalizado
            });
        });
    });
});



//import mysql from 'mysql2';
//import { 
//    DB_HOST,
//    DB_USER,
//    DB_NAME,
//    DB_PASSWORD,
//    DB_PORT } from '../config.js'
//
//
//
//const connection =  mysql.createConnection({
//    host: DB_HOST,
//    user: DB_USER,
//    password: DB_PASSWORD,
//    database: DB_NAME,
//    port: DB_PORT
//});
//
//connection.connect((error)=> {
//    if(error){
//        console.log('El error de conexion es:'+error);
//        return;
//    }
//    console.log('¡Conectado a la base de datos!');
//});
//
//connection.query("CREATE DATABASE _node_login_jwt", function (err, result) {
//    if (err) throw err;
//    console.log("Database created");
//  });
//
//  // Utilizar la base de datos
//  connection.query("USE _node_login_jwt", function (err, result) {
//    if (err) throw err;
//    console.log("Database selected");
//
//    // Crear tabla
//    const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
//      id INT AUTO_INCREMENT PRIMARY KEY,
//      user VARCHAR(255),
//      name VARCHAR(255),
//      pass VARCHAR(255)
//    )`;
//
//    connection.query(createTableQuery, function (err, result) {
//      if (err) throw err;
//      console.log("Table created");
//
//      connection.end();
//});
//});
//
export { connection as default };