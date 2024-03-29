import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PORT } from './config.js';
import router from './routes/router.js';

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
app.use('/', router);

//Para eliminar el cache y no poder volver con el boton back luego ed cerrar sesion
app.use(function(req, res, next){
    if (!req.user)
    res.header('cache-Control', 'private, no-cache, no-store, must-revalite');
    next();
});

app.listen(PORT, (req, res) => {
    console.log('Server UP Running', PORT);
})