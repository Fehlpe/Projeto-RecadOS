let logado = sessionStorage.getItem('logado');
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

let botaoLogin = document.getElementById('btn-login');

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado(){
        if(logado) {
            salvarSessao(logado);
            window.location.href = "home.html";
        }
    }
})

botaoLogin.addEventListener('click', () => {
    verificarLogin();
})

function verificarLogin(){
    let emailHTML = document.getElementById('usuario');
    let senhaHTML = document.getElementById('senha');

    let user = listaUsuarios.find(
        (valor) => valor.email === emailHTML.value && valor.password === senhaHTML.value);

    if(!user){
        alert('E-mail ou Senha inválidos.');
        return;
    }

    salvarSessao(emailHTML.value);
    window.location.href = "home.html";
}

function salvarSessao(data) {
    JSON.stringify(sessionStorage.setItem("logado", data));
}

