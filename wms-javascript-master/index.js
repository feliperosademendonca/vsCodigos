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
app.get('/', function(req, res) {
  res.render('menu');
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
    

   //percorre o arrey de objetos e seus valores
  for(index=0;index<prod.length;index++) {
    //console.log(prod[index].nome)
    //console.log(pesquisado)
    //console.log(prod[index].EAN+' , '+prod[index].nome+' , '+prod[index].codigo)
   
     if (pesquisado == prod[index].EAN |pesquisado == prod[index].nome| pesquisado == prod[index].codigo) {
 
       var ProdPesquisa={
        Ean:prod[index].EAN,
        Codigo:prod[index].codigo,
        Nome:prod[index].nome,
        Quantidade:prod[index].quantidade,
        Validade:prod[index].validade,
        }

        res.render('result',{ProdPesquisa:{
                                        Ean:prod[index].EAN,
                                        Codigo:prod[index].codigo,
                                        Nome:prod[index].nome,
                                        Quantidade:prod[index].quantidade,
                                        Validade:prod[index].validade,
                                        }}) 

       return false

     } if (prod.length -1 == index) {

        res.render('result',{msg:{msg:'Não localizado'+' : '+ pesquisado}}
                  ) 

      console.log('Produto não encontrado')
       return false

 

     }
   }
 ;
  //res.render( "result",{ termo:pesquisado})
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