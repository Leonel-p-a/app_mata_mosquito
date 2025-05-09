let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;

let criaMosquitoTempo;
let criaMosquito;

let nivel = window.location.search;
nivel = nivel.replace('?', ''); // remove o '?' da string

if (nivel.includes('normal')) {
    criaMosquitoTempo = 1500;
};

if (nivel.includes('dificil')) {
    criaMosquitoTempo = 1000;
};

if (nivel.includes('chucknorris')) {
    criaMosquitoTempo = 750;
};

// Ajustar o tamanho do palco de jogo
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

window.addEventListener('resize', ajustaTamanhoPalcoJogo);
ajustaTamanhoPalcoJogo();

// Cria o cronometro
let cronometro = setInterval(function () {
    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(posicaoRandomica);
        window.location.href = 'vitoria.html';
    }
    document.getElementById('cronometro').innerHTML = tempo;
}, 1000);

    document.getElementById('cronometro').innerHTML = tempo;

// Iniciar o jogo
function posicaoRandomica() {
    // Remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            document.getElementById('vida' + vidas).src = 'imagens/coracao_vazio.png';
            vidas++;
        }
    }

    // Gerar posições aleatórias para o mosquito
    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // criar elemento html do mosquito
    let mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    };

    document.body.appendChild(mosquito);
}

// Funções para definir o tamanho e lado do mosquito
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'mosquito1'; // quando usa return, última expressão da função, é interrompido o processamento da função
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

// Função para criar o mosquito a cada segundo
criaMosquito = setInterval(function () {
    posicaoRandomica();
}, criaMosquitoTempo);

// Função para remover o mosquito ao clicar
document.getElementById('mosquito').onclick = function () {
    this.remove();
}