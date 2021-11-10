let participantes = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants");
let status = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status");
let buscarMensagens = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");
let enviarMensagens = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");
let buscarParticipantes = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants");

buscarMensagens.then(servidorMensagens)

function servidorMensagens(mensagem) {
    const chat = document.querySelector(".mensagem")
    console.log(mensagem.data)

    chat.innerHTML = `${mensagem.data.time} ${mensagem.data.from} ${mensagem.data.text}`
}

