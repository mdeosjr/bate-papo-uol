let nome;

function entrarSala() {
    nome = document.querySelector("input.nome").value;
    const dadosNome = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nome });
    
    dadosNome.then(carregarMensagens);
    dadosNome.catch(erroEntrada);

    const container = document.querySelector(".container")
    container.classList.remove("escondido")

    let barraPreta = document.querySelector(".telaParticipantes")
    barraPreta.classList.remove("escondido")
}

function erroEntrada(info) {
    alert(`Erro: ${info.response.status}\nNome já em uso, por favor digite outro nome!`)

    const container = document.querySelector(".container")
    container.classList.add("escondido")

    document.querySelector("input.nome").value = ''
}

function verMensagens(mensagem) {
    const mensagens = mensagem.data;

    const chat = document.querySelector(".chat");

    for (let i = 0; i < mensagens.length; i++) {
        let recebido = mensagens[i]; 
        if (recebido.type === "status") {                                                                         
            chat.innerHTML += 
        `
        <div class="mensagem ${recebido.type} data-identifier="message""> 
            <span class="hora">(${recebido.time})</span> <span class="pessoa">${recebido.from}</span> ${recebido.text}
        </div>
        `
        } else if (recebido.type === "message") {
            chat.innerHTML += 
        `
        <div class="mensagem ${recebido.type} data-identifier="message""> 
            <span class="hora">(${recebido.time})</span> <span class="pessoa">${recebido.from}</span> para <span class="pessoa">${recebido.to}:</span> ${recebido.text}
        </div>
        `
        } else {
            chat.innerHTML += 
        `
        <div class="mensagem ${recebido.type} data-identifier="message""> 
            <span class="hora">(${recebido.time})</span> <span class="pessoa">${recebido.from}</span> reservadamente para <span class="pessoa">${recebido.to}:</span> ${recebido.text}
        </div>
        `
        }
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
    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objetoMensagens)

    document.querySelector("input.texto").value = "";
}

function verificarConexao () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nome })
}

setInterval(verificarConexao, 5000);

function buscaParticipantes () {
    const participantes = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");

    participantes.then(verParticipantes)
    participantes.catch(() => alert("ERRO!"))
}

setInterval(buscaParticipantes, 10000);

function verParticipantes (nomesOnline) {
    let nomes = nomesOnline.data;
    const lista = document.querySelector(".participantes");
    lista.innerHTML =  `<div class="individual" onclick="selecionarParticipante(this)">
                            <ion-icon name="people"></ion-icon>
                            <li>Todos</li>
                        </div>`
    for (let i = 0; i < nomes.length; i++) {
        let recebido = nomes[i]
        lista.innerHTML += 
        `
        <div class="individual" data-identifier="participant" onclick="selecionarParticipante(this)">
            <ion-icon name="person-circle"></ion-icon>
            <li>${recebido.name}</li>
        </div>
       `
    }
}   

function botaoParticipantes () {
    let botao = document.querySelector(".telaParticipantes")
    botao.classList.add("participantesEscondidos")
    botao.classList.remove("escondido")
}

function retirarTelaParticipantes () {
    let barraPreta = document.querySelector(".telaParticipantes")
    barraPreta.classList.remove("participantesEscondidos")
    botao.classList.add("escondido")
}

function selecionarParticipante (selecionado) {
    let borda = document.querySelector(".bordaSelecao")

    if (borda !== null) {
        borda.classList.remove("bordaSelecao")
    }

    selecionado.classList.toggle("bordaSelecao")
}