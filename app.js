const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
require('cookie-parser');

const app = express();

//setear el motor de plantillas
app.set('view engine', 'ejs');

//seteamos la carpeta public para los archivos estaticos
app.use(express.static('public'));

//para procesar datos enviados desde el fomulario
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//setamos las variables de entorno
dotenv.config({path: './env/.env'});

//para poder trabajar las cookies 
app.use(cookieParser());

//llamar al router
app.use('/', require('./routes/router.js'));

//Para eliminar el cache y no poder volver con el boton back luego ed cerrar sesion
app.use(function(req, res, next){
    if (!req.user)
    res.header('cache-Control', 'private, no-cache, no-store, must-revalite');
    next();
});

app.listen(3000, (req, res) => {
    console.log('Server UP Running in http://localhost:3000');
})