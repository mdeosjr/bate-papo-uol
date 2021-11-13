function entrarSala() {
    let nome = prompt("Qual é o seu lindo nome?");
    const dados = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nome });

    dados.catch(entrarSala);
}

entrarSala();

function verMensagens(mensagem) {
    const mensagens = mensagem.data;

    const chat = document.querySelector(".chat");

    for (let i = 0; i < mensagens.length; i++) {
        const recebido = mensagens[i];                                                                          
        chat.innerHTML += `
        <div class="mensagem"> 
            <span class="hora">${recebido.time}</span> <span class="pessoa">${recebido.from}</span> ${recebido.text};
        </div>
        `
    }
}

function verErro (erro) {
    console.log(erro.response);
}

function carregarMensagens() {
    const dados = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    dados.then(verMensagens);

    dados.catch(verErro);
}

setInterval(carregarMensagens, 3000);

