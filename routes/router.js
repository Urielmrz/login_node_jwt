import express from 'express';
const router = express.Router()
//import authController from '../controllers/authController.js';
//import { register, login, isAutenticated, logout } from '../controllers/authController.js';
import * as authController from '../controllers/authController.js';


//router para las vistas
router.get('/', authController.isAutenticated, (req, res)=> {
    res.render('index', {user:req.user})
});
router.get('/login', (req, res)=> {
    res.render('login', {alert:false})
});
router.get('/register', (req, res)=> {
    res.render('register');
});

//router para los metodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

export default router;