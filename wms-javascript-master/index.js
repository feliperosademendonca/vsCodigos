//Configuração das Rotas

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
 
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
 

app.engine('handlebars', handlebars.engine ({ defaultLayout:'main'}))
app.set('view engine', 'handlebars')
   

// rota paras handlebars
app.get('/main', function(req, res) {
  res.render('main');
});

app.get('/menu', function(req, res) {
  res.render('menu');
});
 
app.get('/find', function(req, res) {
  res.render('find');
});

app.post('/result', function(req, res) {
  var inputPesquisa = req.body.pesquisado
  res.send('Pesquisado: '+ req.body.pesquisado);

});
 

app.get('/add', function(req, res) {
  res.render('add');
});


app.get('/rmv', function(req, res) {
  res.render('rmv');
});

// rota para endereço pública
app.use(express.static(__dirname + '/pg/public/'));

    
// rota para CSS
app.get('/public/estilo.css', function(req, res) {
  res.sendFile(__dirname+'/pg/public/estilo.css');
});





app.listen(3000, () => 
console.log('Servidor iniciado na porta 3000: http://localhost:3000')
);