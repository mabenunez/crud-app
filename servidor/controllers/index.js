/*
-creo una carpeta controllers al mismo nivel de bin y public
-creo en ella un archivo index.js
-en el index.js de  routes , lo linkeo con "const indexController= require("../controllers/index")" (index es el archivo)
-en ese mismo archivo de routes pongo la funcion así: 
router.get('/ping', indexController.propiedadDelObjetoEnElQueEstaLaFuncion)
-el archivo index.js de controllers queda así:
function index (req, res, next) {
  res.render('index', { title: 'Express' });
}

function ping (req, res) {
  res.send('pong!');
}
//Tendriamos que invocar las key de este objeto:
module.exports = {
  index: index,
  ping: ping
}
-


*/