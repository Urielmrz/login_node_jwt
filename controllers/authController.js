import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import conexion from '../database/db.js';
import { promisify } from 'util';
import { error } from 'console';

//procedimiento para la registracion
//exports.register = async(req, res)=>{
   export const register = async (req, res) => {

   try {
         const name = req.body.name
         const user = req.body.user
         const pass = req.body.pass
         let passhahs = await bcryptjs.hash(pass,8)
         //console.log(name +"-"+ user +"-"+ pass)
         conexion.query('INSERT INTO users SET ?', {user:user, name:name, pass:passhahs}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/')
         })
   } catch (error) {
      console.log(error)
   }
}

//exports.login = async (req, res)=>{
   //export const login = async (req, res) => {
      export async function login(req, res) {
   try {
      const user = req.body.user
      const pass = req.body.pass
      
      if(!user || !pass){
         res.render('login', {
            alert:true, 
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y un password",
            alertIcon: 'Info',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
         })
      }else{
         conexion.query('SELECT * FROM users WHERE user = ?', [user], async(error, results)=>{
            //console.log("Query:", 'SELECT * FROM users WHERE user = ?', [user]);
            //console.log("Query:", 'SELECT * FROM users WHERE pass = ?', [pass]);
            //console.log("Results:", results);


            //if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))){
               if (!results || results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                  

               res.render('login', {
                  alert:true, 
                  alertTitle: "Advertencia",
                  alertMessage: "Ingrese un usuario y un password",
                  alertIcon: 'Info',
                  showConfirmButton: true,
                  timer: false,
                  ruta: 'login'
               })
            }else{
               //inicio de sesion ok
               const id = results[0].id
               const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                  expiresIn: process.env.JWT_TIEMPO_EXPIRA
               })
               //generamos el token sin fecha de expiracion
               //const token = jwt.sign({id:id}, process.env.JWT_SECRETO)
               console.log("TOKEN: "+token+" para el usuario :" +user)

               const cookiesOptions = {
                  expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookiesOptions)
               res.render('login', {
                  alert:true, 
                  alertTitle: "Conexion Exitosa",
                  alertMessage: "¡Login Correcto!",
                  alertIcon: 'Succes',
                  showConfirmButton: true,
                  timer: 800,
                  ruta: ''
               })
            }
         })
      }
   } catch (error) {
      console.log(error)
   }
}
      

//exports.isAutenticated = async (req, res, next)=>{
   //export const isAutenticated = async (req, res, next) => {
      export async function isAutenticated(req, res, next) {
   if (req.cookies.jwt) {
      try {
         const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
         conexion.query('SELECT * FROM users WHERE id = ?' [decodificada.id], (error, results)=>{
            if(!results){return next()}
            req.user = results[0]
            return next()
         })
         
      } catch (error) {
         console.log(error)
         return next()
         
      }
   }else{
      res.redirect('/login')
   }
}

//exports.logout = (req, res)=> {
   //export const logout = (req, res) => {
      export function logout(req, res) {
   res.clearCookie('jwt')
   return res.redirect('/')
}


