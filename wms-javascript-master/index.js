//Configuração das Rotas
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')

//importar modulos de End.js e Prod.js
const end = require('./end.js').End
const prod = require('./prod.js').Prod

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
 
//Configuração da ViewEngine
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

  var pesquisado = req.body.pesquisado

 //Pesquisar  
   let inputPesquisa = pesquisado

   //percorre o arrey de objetos e seus valores
  for(index=0;index<prod.length;index++) {

     if (inputPesquisa !== prod.EAN) {

       var tdEan = prod[index].EAN
       let tdCodigo = prod[index].codigo
       let tdNome = prod[index].nome
       let tdQuantidade = prod[index].quantidade
       let tdValidade = prod[index].validade


      var table ='<tbody>'
       + '<tr> <th>EAN</th><th>cod</th><th>nome</th><th>valid</th><th>quantidade</th><th>rua</th><th>lado</th><th>predio</th><th>andar</th></tr>'
       + '<tr><td>' + tdEan + '</td><td>' + tdCodigo + '</td><td>' + tdNome + '</td><td>' + tdValidade + '</td><td>' + tdQuantidade + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td></tr><br>'
       + '</tbody>'

       res.send( table) 

       return false

     } if (prod.length - 1 == index) {
       //msg erro pesquisa EAN
       res.send( `<tbody><tr><th>EAN</th></tr><tr><td>EAN Não Localizado</td></tr></tbody>`)
     }
   }
 ;
  res.render( "result",{ termo:pesquisado})
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