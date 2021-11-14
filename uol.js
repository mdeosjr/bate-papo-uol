let nome 

function entrarSala() {
    nome = document.querySelector("input.nome").value

    const dados = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nome });

    dados.then(verificarConexao);
    dados.catch(erroEntrada);
}

function erroEntrada(info) {
    alert("Erro: " + info.response.status + ". Nome já em uso, por favor digite outro nome!")
    entrarSala();
}

//entrarSala();

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

function verErro (erro) {
    console.log(erro.response);
}

function carregarMensagens() {
    const dados = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    dados.then(verMensagens);

    dados.catch(verErro);
}

//setInterval(carregarMensagens, 3000);

function propostaMensagem() {
    let mensagemAEnviar = document.querySelector("input").value;
    let objetoMensagens = {
        from: nome,
        to: "Todos",
        text: mensagemAEnviar,
        type: "message"
    };
    const dados = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objetoMensagens)

    dados.then(enviarMensagem);
    dados.catch(verErro);

    mensagemAEnviar = '';
}

function enviarMensagem(mensagem) {
    const chat = document.querySelector(".chat");
    chat.innerHTML += 
    `
    <div class="mensagem"> 
        <span class="hora">(${mensagem.data.time})</span> <span class="pessoa">${mensagem.data.from}</span> <span class="pessoa">${mensagem.data.to}</span>: ${mensagem.data.text}
    </div>
    `
}

function verificarConexao () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nome })
}

//setInterval(verificarConexao, 5000);