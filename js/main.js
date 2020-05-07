
var lista = [{}];

/* função que calcula o total: valor e quantidade*/
function getTotal(lista) {
  var total = 0;
  for (var key in lista) {
    total += lista[key].valor * lista[key].quant;
  }
  document.getElementById("valorTotal").innerHTML = formatValue(total);
}

/* função que lista a tabela */
function setLista(lista) {
  var tabela = '<thead class="brown white-text lighten-2"><tr><th>Cliente</th><th>Telefone</th><th>Quantidade</th><th class="grey">Ações</th></tr></thead><tbody>';
  for (var key in lista) {
    tabela += '<tr><td>' + formatDesc(lista[key].desc) +
      '</td><td>' + formatQuant(lista[key].quant) +
      '</td><td>' + formatValue(lista[key].valor) +
      '</td><td>' +
      '<a onclick="editarItem(' + key + ');" class="btn-floating btn-medium waves-effect waves-light grey"><i class="material-icons" title="Editar Item">edit</i></a> | ' +
      '<a onclick="deletarItem(' + key + ');" class="btn-floating btn-medium waves-effect waves-light red lighten-2"><i class="material-icons" title="Excluir Item">delete</i></a>' +
      '</td></tr>';
  }
  tabela += '</tbody>';
  document.getElementById("listaTabela").innerHTML = tabela;
  getTotal(lista);
  saveListStorage(lista);
}

/* formatando para a primeira letra ficar maiúscula*/
// function formatDesc(desc) {
//   var str = desc.toLowerCase();
//   str = str.charAt(0).toUpperCase() + str.slice(1);
//   return str;
// }

/* função para receber somento numero */
function formatQuant(quant) {
  var abc = parseFloat(quant).toString();
  var abc = abc.replace(/(\d{5})(\d)/,"$1-$2")
  return abc;
  
}

/* função que converte sting para float com apenas duas casas decimais */
function formatValue(valor) {
  var str = parseFloat(valor).toFixed() + "";
  // str = str.replace(".",","); // transformando . em ,
  // str = "R$" + str; // franformando em $ o valor
  return str;
}

/*submte do botão adicionar - inserindo os dados do input*/
function addItem() {
  if (!validacao()) {
    return;
  }
  var desc = document.getElementById("desc").value;
  var quant = document.getElementById("quant").value;
  var valor = document.getElementById("valor").value;

  lista.unshift({ "desc": desc, "quant": quant, "valor": valor }); //posiciona o item adicionado co começo da tabela
  setLista(lista);
  cancelarItem(); //limpa o formulário e printa na tela
}

/*função que edita/atualiza os dados*/
function editarItem(id) {
  var obj = lista[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("quant").value = obj.quant;
  document.getElementById("valor").value = obj.valor;
  /*exibe os botões salvar e cancelar quando clica em editar na tabela*/
  document.getElementById("btnAtualizar").style.display = "inline";
  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("inputAtulizar").innerHTML = '<input id="idAtualizar" type="hidden" value="' + id + '">';
}

/*função que cancela/limpa o formulário*/
function cancelarItem() {
  document.getElementById("desc").value = ""; document.getElementById("quant").value = "";
  document.getElementById("valor").value = "";

  /*oculta os botões: salvar e cancelar quando clica em cancelar na tabela*/
  document.getElementById("btnAdd").style.display = "inline";
  document.getElementById("btnAtualizar").style.display = "none";

  document.getElementById("inputAtulizar").innerHTML = "";
}

/*função que atualiza o formulário*/
function atualizarItem() {
  if (!validacao()) {
    return;
  }
  var id = document.getElementById("idAtualizar").value;
  var desc = document.getElementById("desc").value;
  var quant = document.getElementById("quant").value;
  var valor = document.getElementById("valor").value;

  lista[id] = { "desc": desc, "quant": quant, "valor": valor };
  cancelarItem(); //limpa o formulário e printa na tela
  setLista(lista); //lista o formulário atualizado
}

/*função que deleta o item da tabela*/
function deletarItem(id) {
  if (confirm("Waldir, tem certeza que deseja excluir esse cliente?")) {
    if (id === lista.length - 1) {
      lista.pop();
    } else if (id === 0) {
      lista.shift();
    } else {
      var arrAuxIni = list.slice(0, id);
      var arrAuxEnd = list.slice(id + 1);
      lista = arrAuxIni.concat(arrAuxEnd);
    }
    setLista(lista);
  }

}

function validacao() {
  var desc = document.getElementById("desc").value;
  var quant = document.getElementById("quant").value;
  var valor = document.getElementById("valor").value;
  var erros = "";

  /*Usando o TOAST do Materialize*/
  if (desc === "") {
    erros += M.toast({ html: 'Você precisa preencher o Nome do Cliente &nbsp' + '<i class="material-icons prefix">error_outline</i>' }); //função TOAST do Materialize
  }
  if (quant === "") {
    erros += M.toast({ html: 'Você precisa preencher o Telefone &nbsp' + '<i class="material-icons prefix">error_outline</i>' });
  } else if (quant != parseInt(quant)) {
    erros += M.toast({ html: 'Preenchimento inválida! &nbsp' + '<i class="material-icons prefix">error_outline</i>' });
  }
  if (valor === "") {
    erros += M.toast({ html: 'Você precisa preencher a Quantidade &nbsp' + '<i class="material-icons prefix">error_outline</i>' });
  } else if (valor != parseFloat(valor)) {
    erros += M.toast({ html: 'Preenchimento inválido! &nbsp</p>' + '<i class="material-icons prefix">error_outline</i>' });
  }

  if (erros != "") {
    return 0;
  } else {
    return 1;
  }
}
/*Limpar a tabela toda*/
function deletarLista() {

  if (confirm("Waldir, tem certeza que deseja deletar a tabela?")) {
    lista = [];
    setLista(lista);
  } if (lista === []) {
    setLista(lista);
    lista += '<h5>Tabela vazia!</h5>';
  }
}

/*Salvando a função no Storage do navegador*/
function saveListStorage(lista) {
  var jsonStr = JSON.stringify(lista);
  localStorage.setItem("lista", jsonStr);
}

/*Salvando a função no Storage do navegador*/
function initListStorage() {
  var testList = localStorage.getItem("lista");
  if (testList) {
    lista = JSON.parse(testList);
  }
  setLista(lista);
}

initListStorage();
