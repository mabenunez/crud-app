var express = require('express');
var router = express.Router();
const users= [
  {
    id: 1,
    name: "María",
    lastname: "Núñez",
    mail: "maria@gmail.com"
  },
];
// importamos el modulo fs
const fs = require('fs');

// esto es para escribir en un archivo
fs.writeFileSync('datos.txt', JSON.stringify(users));

// leo el contenido del archivo, que me devuelve algo diabolico llamado buffer
let contenidoDelArchivo = fs.readFileSync('datos.txt');
// transformamos lo que me devolvio en un json
let contenidoDelArchivoEnJson = JSON.parse(contenidoDelArchivo);

// itero simplemente para mostrar que funciono!
for (var i = 0; i < contenidoDelArchivoEnJson.length; i++) {
  console.log(contenidoDelArchivoEnJson[i]);
}

// agrego un nuevo objeto al array
contenidoDelArchivoEnJson.push({ user: 3, puntos: 1000 })
// vuelvo a escribir los datos en el archivo, para actualizarlo
fs.writeFileSync('datos.txt', JSON.stringify(contenidoDelArchivoEnJson));

//necesito meter el codigo de arriba  en cada una de las funciones de get/post/put/delete

/*estoy creando una url para que en vez de abrir el archivo desde nuestra compu (carpeta cliente),
entre a una url y esos html/css sea lo que muestra 
          CAMBIAAAAAAARRRR lo de abajo con las rutas de las carpetsa
*/
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
router.get('/api/users', function(req, res, next) {
  res.json(users);
});
router.get('/api/users/:id', function(req, res, next) {
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      res.json(users[i]);
    } else {
      res.status(404).send("El usuario no existe")
    }
  }
});
/* POST */
router.post('/api/users', function(req, res, next) {
  const newUser = req.body;
  const lastId = users[users.length-1].id
  newUser.id = lastId + 1;
  users.push(newUser)
  res.json(users);
});
/* PUT */
router.put("/api/users/:id", function(req, res, next) {
  const id = req.params.id;
  let newInfo = req.body;
  for(let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i] = newInfo;
    }
    return res.json(newInfo);
  }
})
/* DELETE */
router.delete("/api/users/:id", function (req, res, next) {
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1)
    }
    return res.json(users);
  }
})

//necesito la posicion
module.exports = router;
