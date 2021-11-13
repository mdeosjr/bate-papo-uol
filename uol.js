let nome = prompt("Qual é o seu nome?")
let dadosNome = {name: nome}
let participantes = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", dadosNome);
participantes.then(entrarNaSala)
participantes.catch(erroDeNome)

function entrarNaSala(acerto) {
    //console.log(acerto.data)
}

function erroDeNome(erro) {
    //console.log(erro.response.data)
    alert("Já existe um participante com este nome, por favor digite outro")
    nome = prompt("Qual é o seu nome?")
}


function verMensagens(info) {
    let chat = document.querySelector(".chat")
    let buscarMensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    for (let i = 0; i < info.data.length; i++) {
        //let mensagem = document.querySelect(".mensagem");
        chat.innerHTML += 
        `
        <div class="mensagem">
            <span class="hora">(${info.data[i].time})</span> <span class="pessoa">${info.data[i].from}</span>  ${info.data[i].text} ${info.data[i].type}
        </div>
        `
        // if (info.data[i].type === 'status') {
        //     mensagem.classList.add("status") 
        // } else if (info.data[i].type === 'private_message') {
        //     mensagem.classList.add("private_message")
        // } else {
        //     mensagem.classList.add("normal")
        // }
    }
    chat.scrollIntoView()
    buscarMensagens.then(verMensagens)
}

let mensagemRecebida
let mensagemEnviada
let enviarMensagens

function mensagemNoChat(msg) {
    mensagemRecebida = document.querySelector("input").value
    mensagemEnviada = {from: nome, to: nome, text: mensagemRecebida, type: "message"}
    enviarMensagens = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagemEnviada);

}

enviarMensagens.then(mensagemNoChat)
enviarMensagens.catch(erroNaMensagem)

