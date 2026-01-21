const botaoCriar = document.getElementById("trilha-btn")
const modal = document.getElementById("modal")
const confirmar = document.getElementById("confirmar")
const cancelar = document.getElementById("cancelar")
const inputNome = document.getElementById("nome-trilha")
const container = document.getElementById("container-trilha")

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

  const card = document.createElement("div")
  card.classList.add("trilha-card")
  card.textContent = nome

  container.appendChild(card)
  modal.classList.add("hidden")

  card.addEventListener("click", () => {
    window.location.href = "trilha.html"
  })
})

