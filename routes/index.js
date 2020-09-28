var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
//var JwtModel = require('../auth/jwt');

//const jwtModel = new JwtModel();
/*
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'slimd',
  connectionLimit: 10,
  debug: false
})
*/




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', {
    name: process.env.API_NAME,
    title: 'RESTful api server!',
    link: process.env.Link_web,
    API_NAME: process.env.API_NAME
  });
  //res.send({ message: 'Welcome to RESTful api server!', status: HttpStatus.OK, ok: true, date: moment().format('DD-MM-YYYY HH:mm:ss'), "api_name": "f-api", "version": "1.0.1-63.04.30-01" });
});



/*
router.get('/testconnect', function (req, res, next) {
  if (db != null) {
    console.log('connection  success!!')
    res.send('connect success');
  } else {
    res.send('connect fail')
  }
})
*/
router.get('/verify', async (req, res) => {
  var token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6Inh4eCIsImlhdCI6MTU1NjYwODQ4MiwiZXhwIjoxNTU2Njk0ODgyfQ.2iUfTQoyMhleJAGdmyXAgd82i1bPxeUNH8r96O-Cbys`;
  try {
    var decoded = await jwtModel.verify(token);
    console.log(decoded);
    // console.log(message);
    res.send({
      ok: true,
      payload: decoded
    });
  } catch (error) {
    res.send({
      ok: false,
      error: error.message,
      code: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }
});

module.exports = router;