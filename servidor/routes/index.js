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
  res.status(404).send("El usuario no existe")
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
  console.log(users)
  const newUser = req.body;
  if(users.length == 0) {
    newUser.id = 1
  }else {
    const lastId = users[users.length-1].id
    newUser.id = lastId + 1;
    console.log(lastId)
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