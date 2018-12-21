const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
let filtered = [];
router.get("/users", function (req, res) {
  res.sendFile( path.join(__dirname, "..", "public", "html", "index.html"))  
})
router.get("/users/add-user", function (req, res) {
  res.sendFile( path.join(__dirname, "..", "public", "html", "add-one.html"))  
})
router.get("/users/edit-user", function (req, res) {
  res.sendFile( path.join(__dirname, "..", "public", "html", "edit-one.html"))  
})
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
/* GET home page. */
router.get('/ping', function(req, res, next) {
  res.send("pong")
});
// router.get('/api/users', function(req, res, next) {
//   let contenidoDelArchivo = fs.readFileSync('datos.json');
//   let users = JSON.parse(contenidoDelArchivo);
//   res.json(users);
// });
router.get('/api/users/:id', function(req, res, next) {
  let contenidoDelArchivo = fs.readFileSync('datos.json');
  let users = JSON.parse(contenidoDelArchivo);
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return res.json(users[i]);
    }
  }
  res.status(404).send("This user doesn't exist")
});
/*FILTER AND THEN GET*/
router.get('/api/users', function (req, res) {
  let search= req.query.search;
  let contenidoDelArchivo = fs.readFileSync('datos.json');
  let users = JSON.parse(contenidoDelArchivo);
  if (search && search.length > 0) {
    filtered = users.filter (function (u) {
      //lo siguiente es igual a decir que si se cumplen esas condiciones, devuelve true, else, devuelve false
      return u.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || 
      u.lastname.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
      u.phone.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
      u.mail.toLowerCase().indexOf(search.toLowerCase()) >= 0
    })
    res.json(filtered);
  } else {
    res.json(users);
  }
})
/* POST
TENGO QUE VALIDAR QUE AL DAR VARIOS CLIC A ADD ME AÑADE MUCHAS VECES EL MISMO USUARIO buscar si el usuario esta repetido
*/
router.post('/api/users', function(req, res, next) {
  let contenidoDelArchivo = fs.readFileSync('datos.json');
  let users = JSON.parse(contenidoDelArchivo);
  const newUser = req.body;
  if(users.length == 0) {
    newUser.id = 1
  }else {
    const lastId = users[users.length-1].id
    newUser.id = lastId + 1;
  }
  //añadir que la length sea menor que 30
  if (newUser.name.length === 0 || newUser.lastname.length === 0 || newUser.phone.length === 0 || newUser.mail.length === 0){
    return res.status(400).end('all fields are required') //end termina el method
  }
  if (validateEmail(newUser.mail) === false ){
    return res.status(400).end('invalid e-mail')
  }
  if(!(/^\d+$/.test(newUser.phone))){
    return res.status(400).end('invalid phone number');
  }
  users.push(newUser)
  fs.writeFileSync('datos.json', JSON.stringify(users));
  res.json(users);
});
/* PUT */
router.put("/api/users/:id", function(req, res, next) {
  let contenidoDelArchivo = fs.readFileSync('datos.json');
  let users = JSON.parse(contenidoDelArchivo);
  const id = req.params.id;
  let newInfo = req.body;
  newInfo.id = id;
  for(let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i] = newInfo;
    }
  }
  if (newInfo.name.length === 0 || newInfo.lastname.length === 0 || newInfo.phone.length === 0 || newInfo.mail.length === 0){
    return res.status(400).end('all fields are required') //end termina el method
  }
  if (validateEmail(newInfo.mail) === false){
    return res.status(400).end('invalid e-mail')
  }
  if(!(/^\d+$/.test(newInfo.phone))){
    return res.status(400).end('invalid phone number');
  }
  fs.writeFileSync('datos.json', JSON.stringify(users));
  res.json(newInfo);
})
/* DELETE */
router.delete("/api/users/:id", function (req, res, next) {
  let contenidoDelArchivo = fs.readFileSync('datos.json');
  let users = JSON.parse(contenidoDelArchivo);
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1)
    }
  }
  res.json(users);
  fs.writeFileSync('datos.json', JSON.stringify(users));
})

module.exports = router;