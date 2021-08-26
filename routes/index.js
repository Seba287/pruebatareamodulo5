var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  novedades = novedades.splice(0, 5);
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/VeterinariaX.jpg'
      }
    }
  });

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