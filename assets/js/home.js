
const logado = sessionStorage.getItem('logado');
const listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]'); 
const formRecado = document.querySelector("#form-novo-recado");
const inputNovoRecado = document.querySelector("#novo-recado-input");
const listaElementos = document.querySelector("#recados"); 
const botaoLogout = document.getElementById("logout");
const tituloComNome = document.getElementById("titulo-home");

document.addEventListener('DOMContentLoaded', () => {

    checarLogado();

    function checarLogado(){
        if(!logado){
            window.location.href = "index.html"
            return
        }
    }

    let listaUsuarios = buscarTodosUsuarios();

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);
    
    tituloComNome.innerHTML = `Olá, <span>${user.username}</span> `;    

    user.recados.forEach((recado) => montarRecado(recado))

})

function buscarTodosUsuarios(){
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

botaoLogout.addEventListener('click', () => {
    sessionStorage.removeItem('logado')
    document.location.reload();
})

formRecado.addEventListener('submit', (e) => {
    e.preventDefault();

    salvarRecado();

});

function salvarRecado(){
    let recado = inputNovoRecado.value;

    const novoRecado = {
        detalhamento: recado,
        id: Math.floor(Math.random() * Date.now())
    }

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user.recados.push(novoRecado);

    atualizarDadosUsuario(user);
    formRecado.reset();
    montarRecado(novoRecado);
}

function atualizarDadosUsuario(dadosAtualizados){
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user = dadosAtualizados;

    atualizarStorage();
}

function atualizarStorage(){
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

function montarRecado(novoRecado){  
    let recado =  novoRecado.detalhamento;
    const elementoRecado = document.createElement("div");
    elementoRecado.classList.add("recado");
    elementoRecado.setAttribute('id', novoRecado.id);
    const conteudoRecado = document.createElement("div");
    conteudoRecado.classList.add("conteudo-recado");
    elementoRecado.appendChild(conteudoRecado);
    const inputRecado = document.createElement("input");
    inputRecado.classList.add("texto-recado");
    inputRecado.type = "text";
    inputRecado.value = recado;
    inputRecado.setAttribute("readonly", "readonly");
    conteudoRecado.appendChild(inputRecado);
    const botoesRecado = document.createElement("div");
    botoesRecado.classList.add("botoes-recado");
    const botaoEditarRecado = document.createElement("button");
    botaoEditarRecado.classList.add("editar-recado");
    botaoEditarRecado.innerHTML = "EDITAR";
    const botaoDeletarRecado = document.createElement("button");
    botaoDeletarRecado.classList.add("deletar-recado");
    botaoDeletarRecado.innerHTML = "DELETAR";
    botoesRecado.appendChild(botaoEditarRecado);
    botoesRecado.appendChild(botaoDeletarRecado);
    elementoRecado.appendChild(botoesRecado);
    listaElementos.appendChild(elementoRecado);

    // botaoEditarRecado.addEventListener('click', () => );

    // botaoEditarRecado.addEventListener('click', () => {
    //     if(botaoEditarRecado.innerText.toLocaleLowerCase() == "editar"){
    //         inputElementoRecado.removeAttribute("readonly");
    //         inputElementoRecado.focus();
    //         botaoEditarRecado.innerText = "SALVAR";
    //     } else {
    //         inputElementoRecado.setAttribute("readonly", "readonly");
    //         botaoEditarRecado.innerText = "EDITAR";
    //     }
    // })
    botaoEditarRecado.addEventListener('click', () => editarRecado(botaoEditarRecado, inputRecado, novoRecado.id));
    botaoDeletarRecado.addEventListener('click', () => apagarRecado(novoRecado.id));
};

function editarRecado(botaoEditarRecado, inputRecado, id){
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);
    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    if(botaoEditarRecado.innerText.toLocaleLowerCase() == "editar"){
        inputRecado.removeAttribute("readonly");
        inputRecado.focus();
        botaoEditarRecado.innerText = "SALVAR";
    } else {
        inputRecado.setAttribute("readonly", "readonly");
        botaoEditarRecado.innerText = "EDITAR";
        let novoInput = inputRecado.value;
        user.recados[recadoEspecifico].detalhamento = novoInput;
        atualizarDadosUsuario(user);
    }
}

function apagarRecado(id){
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);
    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    let linhaRecado = document.getElementById(id);

    let confirma = confirm(`Você realmente deseja apagar esse recado?`);

    if(confirma){
        linhaRecado.remove();
        user.recados.splice(recadoEspecifico, 1);
        atualizarDadosUsuario(user);
    } else {
        return
    }
}



