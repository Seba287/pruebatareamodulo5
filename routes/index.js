var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
    res.render('index', {
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var emial = req.body.inputEmail4;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;
  console.log(req.body);

  var obj = {
    to: 'seba.gonza887@gmail.com',
    subject: 'Contacto desde la Web',
    html: nombre + "" + apellido + " se contacto a traves y quiere mas info a este correo: " + emial + ". <br> su tel es " + telefono
  } //cierra var obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {

      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })//cierra trasnporter

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });

}); //cierra peticion del POST

module.exports = router;
