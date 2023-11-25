
var prod = [
  { "EAN": 7894900011511, "codigo": "01", "nome": "coca 350ml unid", "validade": "01/01/23", "quantidade": 900 },
  { "EAN": 7894900011517, "codigo": "02", "nome": "coca 1lt unid", "validade": "01/01/23", "quantidade": 800 },
  { "EAN": 7894900011512, "codigo": "03", "nome": "coca 2lt unid", "validade": "01/01/23", "quantidade": 800 },
  { "EAN": 7894900011513, "codigo": "04", "nome": "coca 500ml unid", "validade": "01/01/23", "quantidade": 800 },
  { "EAN": 7894900011514, "codigo": "05", "nome": "coca 3lt unid", "validade": "01/01/23", "quantidade": 800 },
  { "EAN": 7894900011515, "codigo": "06", "nome": "coca 220ml unid", "validade": "01/01/24", "quantidade": 800 },
  { "EAN": 7894900011516, "codigo": "07", "nome": "coca 200ml unid", "validade": "01/01/23", "quantidade": 0 },
  { "EAN": 7894900011510, "codigo": "08", "nome": "coca Zero 350ml unid", "validade": "01/01/23", "quantidade": 800 },
];

var end = [
  { "id": "001", "rua": "a", "lado": "esquerdo", "Predio": "1", "andar": "1", "produto": '' },
  { "id": "002", "rua": "a", "lado": "esquerdo", "Predio": "1", "andar": "2", "produto": '' },
  { "id": "003", "rua": "a", "lado": "esquerdo", "Predio": "1", "andar": "3", "produto": '' },
  { "id": "004", "rua": "a", "lado": "esquerdo", "Predio": "1", "andar": "4", "produto": '' },
  { "id": "005", "rua": "a", "lado": "esquerdo", "Predio": "2", "andar": "1", "produto": '' },
  { "id": "006", "rua": "a", "lado": "esquerdo", "Predio": "2", "andar": "2", "produto": '' },
  { "id": "007", "rua": "a", "lado": "esquerdo", "Predio": "2", "andar": "3", "produto": '' },
  { "id": "008", "rua": "a", "lado": "esquerdo", "Predio": "2", "andar": "4", "produto": '' },
  { "id": "009", "rua": "a", "lado": "esquerdo", "Predio": "3", "andar": "1", "produto": '' },
  { "id": "010", "rua": "a", "lado": "esquerdo", "Predio": "3", "andar": "2", "produto": '' },
  { "id": "011", "rua": "a", "lado": "esquerdo", "Predio": "3", "andar": "3", "produto": '' },
  { "id": "012", "rua": "a", "lado": "esquerdo", "Predio": "3", "andar": "4", "produto": '' },
  { "id": "013", "rua": "a", "lado": "esquerdo", "Predio": "4", "andar": "1", "produto": '' },
  { "id": "014", "rua": "a", "lado": "esquerdo", "Predio": "4", "andar": "2", "produto": '' },
  { "id": "015", "rua": "a", "lado": "esquerdo", "Predio": "4", "andar": "3", "produto": '' },
  { "id": "016", "rua": "a", "lado": "esquerdo", "Predio": "4", "andar": "4", "produto": '' },
  { "id": "017", "rua": "a", "lado": "esquerdo", "Predio": "5", "andar": "1", "produto": '' },
  { "id": "018", "rua": "a", "lado": "esquerdo", "Predio": "5", "andar": "2", "produto": '' },
  { "id": "019", "rua": "a", "lado": "esquerdo", "Predio": "5", "andar": "3", "produto": '' },
  { "id": "021", "rua": "a", "lado": "esquerdo", "Predio": "5", "andar": "4", "produto": '' },
  { "id": "022", "rua": "a", "lado": "esquerdo", "Predio": "6", "andar": "1", "produto": '' },
  { "id": "023", "rua": "a", "lado": "esquerdo", "Predio": "6", "andar": "2", "produto": '' },
  { "id": "024", "rua": "a", "lado": "esquerdo", "Predio": "6", "andar": "3", "produto": '' },
  { "id": "025", "rua": "a", "lado": "esquerdo", "Predio": "6", "andar": "4", "produto": '' },
]
//carrega página
//document.onload = function () {alert("clicou em pesquisar")}

  //Pesquisar  
  $("button[name=btn-Pesquisar]").click(function () {
    //alert("clicou em pesquisar")

    let inputPesquisa = parseInt($('#inputText').val())

    //percorre o arrey de objetos e seus valores
    $.each(prod, function (index, element) {

      if (inputPesquisa === element.EAN) {

        var tdEan = prod[index].EAN
        let tdCodigo = prod[index].codigo
        let tdNome = prod[index].nome
        let tdQuantidade = prod[index].quantidade
        let tdValidade = prod[index].validade

        $('#tabelaResultado').html(
          +'<tbody>'
          + '<tr> <th>EAN</th><th>cod</th><th>nome</th><th>valid</th><th>quantidade</th><th>rua</th><th>lado</th><th>predio</th><th>andar</th></tr>'
          + '<tr><td>' + tdEan + '</td><td>' + tdCodigo + '</td><td>' + tdNome + '</td><td>' + tdValidade + '</td><td>' + tdQuantidade + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td></tr><br>'
          + '</tbody>'
        )

        return false

      } if (prod.length - 1 == index) {
        //msg erro pesquisa EAN
        $('#tabelaResultado').html('<tbody><tr><th>EAN</th>/tr><tr><td>EAN Não Localizado</td>/tr></tbody>')
      }
    })
  });

  //add produtos novos aos endereços
  $("button[name=ADD-EAN]").click(function () {

    var dataFormatada = $("input[name=ADD-DATE-VALIDADE]").val().replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');
     if ($("input[name=ADD-QUANTIDADE]").val() == 'null') {
      var valInput = $("input[name=ADD-QUANTIDADE]").val()
    } else {
      valInput = 0
    }

    let prod_add_end = {
      ean: $("input[name=ADD-EAN]").val(),
      validade: dataFormatada,
      quantidade: valInput,
      rua: $("select[name=ADD-RUA]").val(),
      lado: $("select[name=ADD-LADO]").val(),
      predio: $("select[name=ADD-PREDIO]").val(),
      andar: $("select[name=ADD-ANDAR]").val(),
    }

    $.each(prod, function (index, element) {
      if (prod_add_end.ean == element.EAN) {
        let ean = element.EAN
        let codigo = element.codigo
        let nome = element.nome
        let quantidade = element.quantidade = prod[index].quantidade += parseInt(prod_add_end.quantidade)
        let validade = dataFormatada
        let rua = prod_add_end.rua
        let lado = prod_add_end.lado
        let predio = prod_add_end.predio
        let andar = prod_add_end.andar


        $('table[name=table-add]').html(
          +'<tbody>'
          + '<tr>   <th>EAN</th>         <th>cod</th>  <th>nome</th>    <th>valid</th>     <th>quantidade</th>    <th>rua</th>     <th>lado</th>   <th>predio</th>   <th>andar</th></tr>'
          + '<tr><td>' + ean + '</td><td>' + codigo + '</td><td>' + nome + '</td><td>' + validade + '</td><td>' + quantidade + '</td><td>' + rua + '</td><td>' + lado + '</td><<td>' + predio + '</td> <td>' + andar + '</td> </tr><br>'
          + '</tbody>'
        )

        return false

      } if (prod.length - 1 == index) {
        $('#tabelaResultado').html('<tbody><tr><th>EAN</th>/tr><tr><td>EAN Não Localizado</td>/tr></tbody>')
      }
    })

  })


  //ultima chave da função   

