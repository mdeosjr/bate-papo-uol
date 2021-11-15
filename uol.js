let nome 

function entrarSala() {
    nome = document.querySelector("input.nome").value

    const dadosNome = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nome });
    
    dadosNome.then(carregarMensagens);
    dadosNome.catch(erroEntrada);

    const container = document.querySelector(".container")
    container.classList.remove("escondido")
}

function erroEntrada(info) {
    alert(`Erro: ${info.response.status}. Nome já em uso, por favor digite outro nome!`)
}

function verMensagens(mensagem) {
    const mensagens = mensagem.data;

    const chat = document.querySelector(".chat");

    for (let i = 0; i < mensagens.length; i++) {
        let recebido = mensagens[i];                                                                          
        chat.innerHTML += 
        `
        <div class="mensagem ${recebido.type} data-identifier="message""> 
            <span class="hora">(${recebido.time})</span> <span class="pessoa">${recebido.from}</span> para <span class="pessoa">${recebido.to}:</span> ${recebido.text}
        </div>
        `
    }
    let todasAsMensagens = document.querySelector(".chat");
    let ultimaMensagem = todasAsMensagens.lastElementChild;
    ultimaMensagem.scrollIntoView();
}

function carregarMensagens() {
    const dados = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    dados.then(verMensagens);
}

setInterval(carregarMensagens, 3000);

function propostaMensagem() {
    let mensagemAEnviar = document.querySelector("input.texto").value;
    let objetoMensagens = {
        from: nome,
        to: "Todos",
        text: mensagemAEnviar,
        type: "message"
    };
    const dados = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objetoMensagens)

    document.querySelector("input.texto").value = "";
}

function verificarConexao () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nome })
}

setInterval(verificarConexao, 5000);