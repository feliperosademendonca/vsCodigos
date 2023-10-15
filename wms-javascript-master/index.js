//Configuração das Rotas
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
 

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
   

// rota do handlebars
app.get('/', function(req, res) {
  res.render('menu');
});

// Tela Inicial HOMEPage
app.get('/menu', function(req, res) {
  res.render('menu');
});

//Pesquisar  Produto
app.get('/find', function(req, res) {
  res.render('find');
});

//Resultado da Pesquisa
app.post('/result', function(req, res) {

  var pesquisado = req.body.pesquisado
 
   //percorre o arrey de objetos e seus valores
  for(index=0;index<prod.length;index++) {
       if (pesquisado == prod[index].EAN |pesquisado == prod[index].nome| prod[index].nome.includes(pesquisado)) {
        
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
   };
});

//Pesquisa Endereço
app.get('/end', function(req, res) {
  res.render('end');
});

//Resultado Pesquisa Endereço
app.post('/resultEstante', function(req, res) {{{
  
  var EndInput = req.body.pesquisadoEndEstante
  console.log('predio informado: '+EndInput)
 
   
   
//Pesquisa no Array predio
   var endResult = end.filter(end => end.predio == EndInput);

  if (endResult.length===0) {
    console.log('nada encontrado')

  } else {

    console.log('Endereço encontrado foram: '+endResult.length)   
    endResult.forEach(end => {  console.log(end) 
     
       var endPesquisa={
         id:end.id,
         codigo:end.codigo,
         predio:end.predio,
         rua:end.rua,
         lado:end.lado,
         andar:end.andar,
 
         }
 
     //não esta carregando as propiedades
          console.log('id informado: '+endPesquisa.id)
            res.render('resultEstante',{endPesquisa:{
                                                   codigo:endPesquisa.codigo,
                                                   id:endPesquisa.id,
                                                   predio:endPesquisa.Predio,
                                                   andar:endPesquisa.andar,
                                                   rua:endPesquisa.rua,
                                                   lado:endPesquisa.lado,
                                                   
                                              }})   

      

    })
   
   }
  } 
 };
}
);


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