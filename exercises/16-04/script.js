const areaJogo = document.getElementById("area-jogo");
const pontuacaoTexto = document.getElementById("pontuacao");
const tempoTexto = document.getElementById("tempo");
const botaoIniciar = document.getElementById("botao-iniciar");
const mensagemFinal = document.getElementById("mensagem-final");
const efeitoCursor = document.getElementById("efeito-cursor");

let pontuacao = 0;
let tempoRestante = 15;
let intervaloInimigos = null;
let intervaloTempo = null;
let timeoutFim = null;
let jogoAtivo = false;

document.addEventListener("mousemove", (evento) => {
    efeitoCursor.style.left = `${evento.clientX}px`;
    efeitoCursor.style.top = `${evento.clientY}px`;
});

document.addEventListener("click", () => {
    efeitoCursor.classList.add("ativo");

    setTimeout(() => {
        efeitoCursor.classList.remove("ativo");
    }, 120);
});

function criarParticula(x, y) {
    const particula = document.createElement("div");
    particula.classList.add("particula");

    particula.style.left = `${x - 10}px`;
    particula.style.top = `${y - 10}px`;

    areaJogo.appendChild(particula);

    setTimeout(() => {
        particula.remove();
    }, 500);
}

function criarInimigo() {
    if (!jogoAtivo) return;

    const inimigo = document.createElement("img");
    inimigo.src = "Imagens/mask_yami.png";
    inimigo.alt = "Yami";
    inimigo.classList.add("inimigo");

    const larguraArea = areaJogo.clientWidth;
    const alturaArea = areaJogo.clientHeight;

    const larguraInimigo = 90;
    const alturaInimigo = 90;

    const x = Math.random() * (larguraArea - larguraInimigo);
    const y = Math.random() * (alturaArea - alturaInimigo);

    inimigo.style.left = `${x}px`;
    inimigo.style.top = `${y}px`;

    inimigo.addEventListener("click", (evento) => {
        if (!jogoAtivo) return;

        pontuacao++;
        pontuacaoTexto.textContent = pontuacao;

        criarParticula(x + evento.offsetX, y + evento.offsetY);

        inimigo.remove();
    });

    areaJogo.appendChild(inimigo);

    setTimeout(() => {
        inimigo.remove();
    }, 900);
}

function encerrarJogo() {
    jogoAtivo = false;

    clearInterval(intervaloInimigos);
    clearInterval(intervaloTempo);
    clearTimeout(timeoutFim);

    areaJogo.innerHTML = "";

    mensagemFinal.textContent = `Fim de jogo! Sua pontuação foi ${pontuacao}.`;
}

function iniciarJogo() {
    if (jogoAtivo) return;

    jogoAtivo = true;
    pontuacao = 0;
    tempoRestante = 15;

    pontuacaoTexto.textContent = pontuacao;
    tempoTexto.textContent = tempoRestante;
    mensagemFinal.textContent = "";
    areaJogo.innerHTML = "";

    intervaloInimigos = setInterval(criarInimigo, 700);

    intervaloTempo = setInterval(() => {
        tempoRestante--;
        tempoTexto.textContent = tempoRestante;
    }, 1000);

    timeoutFim = setTimeout(() => {
        encerrarJogo();
    }, 15000);
}

botaoIniciar.addEventListener("click", iniciarJogo);