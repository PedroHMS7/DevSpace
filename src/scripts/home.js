const botaoCriar = document.getElementById("trilha-btn")
const modal = document.getElementById("modal")
const confirmar = document.getElementById("confirmar")
const cancelar = document.getElementById("cancelar")
const inputNome = document.getElementById("nome-trilha")
const container = document.getElementById("container-trilha")
let trilhas = JSON.parse(localStorage.getItem("trilhas")) || [];

// 1. Abrir modal
botaoCriar.addEventListener("click", () => {
  modal.classList.remove("hidden")
  inputNome.value = "" // limpa campo
  inputNome.focus()
})

// 2. Cancelar
cancelar.addEventListener("click", () => {
  modal.classList.add("hidden")
})

// 3. Confirmar e criar card
confirmar.addEventListener("click", () => {
  const nome = inputNome.value.trim()

  if (!nome) return alert("Digite um nome")

  const trilha = {
    id: Date.now(), 
    nome: nome
  };

  trilhas.push(trilha);
  localStorage.setItem("trilhas", JSON.stringify(trilhas));

  criarCard(trilha);

  modal.classList.add("hidden");


})

function criarCard(trilha) {
  const card = document.createElement("div")
  card.classList.add("trilha-card")
  card.textContent = trilha.nome

  
  modal.classList.add("hidden")

  card.addEventListener("click", () => {
    window.location.href = "trilha.html"
  })
  container.appendChild(card)
}

window.addEventListener("DOMContentLoaded", () => {
  trilhas.forEach(trilha => criarCard(trilha));
});

