let participantes = axios.post("http://mock-api.driven.com.br/api/v3/uol/participants");
let status = axios.post("http://mock-api.driven.com/api/v3/uol/status");
let buscarMensagens = axios.get("http://mock-api.driven.com/api/v3/uol/messages");
let enviarMensagens = axios.post("http://mock-api.driven.com.br/api/v3/uol/messages");
let buscarParticipantes = axios.get("http://mock-api.driven.com.br/api/v3/uol/participants");

const chatStatus = document.querySelector(".status");
const chatReservado = document.querySelector(".reservado");
const chatNormal = document.querySelector(".normal");

