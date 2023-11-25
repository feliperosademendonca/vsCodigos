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

//Resultado da Pesquisa Produto
app.post('/result', function(req, res) {

  var pesquisado = req.body.pesquisado
  console.log("Pesquisado " +pesquisado)

   //percorre o arrey de objetos e seus valores
  
  var objetosEncontrados = end.filter(objeto => objeto.produtoNoEndereco.EAN == pesquisado)


  if(objetosEncontrados.length > 0){
 
    var soma = objetosEncontrados.reduce(function (acumulador, item) {
      return acumulador + item.produtoNoEndereco.quantidade;
    }, 0);
    console.log(objetosEncontrados)
    res.render('result',{objetosEncontrados, pesquisado, soma})   

  }else{

    console.log("Nenhum EAN")
    console.log("Pesquisando pela Descrição")

    
  var objetosEncontrados = end.filter(objeto => objeto.produtoNoEndereco.descricao.indexOf(pesquisado) !== -1);
    var soma = objetosEncontrados.reduce(function (acumulador, item) {
      return acumulador + item.produtoNoEndereco.quantidade;
    }, 0);

    console.log("Encontrado: "+objetosEncontrados)

    res.render('result',{objetosEncontrados, pesquisado, soma})   

   // res.render('result',{pesquisado})  
  }
});

//Pesquisa Endereço
app.get('/end', function(req, res) {
  res.render('end');
});

//Resultado Pesquisa Endereço
app.post('/resultEstante', function(req, res) {{{
  
  
  var EndInput = req.body.pesquisadoEndEstante
  console.log('EndSolicitado: '+EndInput)
 
        //Pesquisa no Array predio
          var endResult = end.filter(end => end.id == EndInput);

          if (endResult.length===0) {
            console.log('nada encontrado')

          } else {

            console.log(endResult.length+' endereço encontrado')
            endResult.forEach(end=>{console.log(end.produtoNoEndereco.descricao) 
             
        
            //não esta carregando as propiedades
                  console.log('id informado: '+ end.id)
                    res.render('resultEstante',{endPesqusa:end})   

              

    })
   
   }
  } 
 };
}
)

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