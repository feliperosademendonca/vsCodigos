//Configuração das Rotas

const express = require('express');
const app = express();

// rota para pg inicial
app.get('/', function(req, res) {
  res.send('SISTEMAS DE GESTÂO DE WMS OpenSource');
});

// rota para pagina de pesquisar endereço ou produtos
app.get('/find', function(req, res) {
    res.send('Pesquisa');
  });

// rota para pagina de adcionar produto ao endereço
app.get('/add', function(req, res) {
    res.send('Adicionar produto ao endereço');
  });

// rota para pagina de remover o produto do endereço
app.get('/rmv', function(req, res) {
    res.send('Remover produto do endereço');
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