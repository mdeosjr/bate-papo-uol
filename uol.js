let participantes = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants");
let status = axios.post("https://mock-api.driven.com.br/api/v4/uol/status");
let buscarMensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
let enviarMensagens = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages");
let buscarParticipantes = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");

buscarMensagens.then(servidorMensagens)

function servidorMensagens(mensagem) {
    const chat = document.querySelector(".chat")
    const tipo = document.querySelector(".mensagem")
    //let comparador = mensagem.data.type

    for (let i = 0; i < 7; i++) {
        chat.innerHTML += 
        `
        <div class="mensagem">
            (${mensagem.data[i].time}) ${mensagem.data[i].from} ${mensagem.data[i].text} ${mensagem.data[i].type}
        </div>
        `
    }

    if (mensagem.data[i].type.includes('status')) {
        tipo.classList.add("status")
    } else if (mensagem.data[i].type === 'private_message') {
        tipo.classList.add("reservado")
    } else {
        tipo.classList.add("normal")
    }
}

