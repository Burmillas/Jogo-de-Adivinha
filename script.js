const minValue = 1;
const maxValue = 100;
let secretNumber = 0;
let attempts = 0;
let currentMin = minValue;
let currentMax = maxValue;

const userGuessInput = document.getElementById('user-guess');
const feedbackMessage = document.getElementById('feedback-message');
const attemptsDisplay = document.getElementById('attempts');
const rangeInfo = document.getElementById('range-info');
const successFooter = document.getElementById('success-footer');
const actionButton = document.getElementById('btn-action');
const restartButton = document.getElementById('restart-button');

function gerarNumeroSecreto() {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function atualizarInterface() {
  attemptsDisplay.textContent = `Tentativas: ${attempts}`;
  rangeInfo.textContent = `Intervalo: ${currentMin} - ${currentMax}`;
}

function mostrarMensagem(text, type = 'info') {
  feedbackMessage.textContent = text;
  feedbackMessage.style.color = type === 'error' ? '#fb7185' : type === 'success' ? '#22c55e' : '#e2e8f0';
}

function ativarEntrada(valor) {
  userGuessInput.disabled = !valor;
  actionButton.disabled = !valor;
  if (valor) {
    userGuessInput.focus();
  }
}

function resetarJogo() {
  secretNumber = gerarNumeroSecreto();
  attempts = 0;
  currentMin = minValue;
  currentMax = maxValue;
  successFooter.classList.add('hidden');
  mostrarMensagem('Digite um número de 1 a 100');
  atualizarInterface();
  ativarEntrada(true);
  userGuessInput.value = '';
}

function finalizarJogo() {
  ativarEntrada(false);
  successFooter.classList.remove('hidden');
}

function validarPalpite(valor) {
  if (!valor || Number.isNaN(valor)) {
    mostrarMensagem('Por favor informe um número válido.', 'error');
    return false;
  }

  if (valor < minValue || valor > maxValue) {
    mostrarMensagem(`O número deve estar entre ${minValue} e ${maxValue}.`, 'error');
    return false;
  }

  return true;
}

function verificarPalpite() {
  const guess = Number(userGuessInput.value);

  if (!validarPalpite(guess)) {
    return;
  }

  attempts += 1;
  atualizarInterface();

  if (guess === secretNumber) {
    mostrarMensagem(`Parabéns! O número secreto era ${secretNumber}.`, 'success');
    finalizarJogo();
    return;
  }

  if (guess < secretNumber) {
    currentMin = Math.max(currentMin, guess + 1);
    mostrarMensagem('Tente um número maior.');
  } else {
    currentMax = Math.min(currentMax, guess - 1);
    mostrarMensagem('Tente um número menor.');
  }

  atualizarInterface();
  userGuessInput.value = '';
}

actionButton.addEventListener('click', verificarPalpite);
userGuessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    verificarPalpite();
  }
});
restartButton.addEventListener('click', resetarJogo);

resetarJogo();
