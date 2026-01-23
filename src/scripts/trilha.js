const botaoTopico = document.getElementById("topico-btn")
const modal = document.getElementById("modal")
const confirmar = document.getElementById("confirmar")
const cancelar = document.getElementById("cancelar")
const inputNome = document.getElementById("nome-topico")
const container = document.getElementById("topico-container")
const barraFill = document.getElementById("barra-prog-fill")
const barraText = document.getElementById("barra-prog-text")


botaoTopico.addEventListener("click", () => {
    modal.classList.remove("hidden")
    inputNome.value = "" // limpa campo
    inputNome.focus()
})

cancelar.addEventListener("click", () => {
    modal.classList.add("hidden")
})

confirmar.addEventListener("click", () => {
    const nome = inputNome.value.trim()

    if (!nome) {
        alert("Digite um nome!")
        return
    }

    
    const card = document.createElement("div")
    card.classList.add("topico-card")

    
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.addEventListener("change", atualizarProgresso)


    
    const label = document.createElement("label")
    label.textContent = nome

    
    card.appendChild(checkbox)
    card.appendChild(label)

    
    container.appendChild(card)

    
    modal.classList.add("hidden")

    atualizarProgresso()
})

function atualizarProgresso() {
    const checkboxes = container.querySelectorAll("input[type='checkbox']")
    const total = checkboxes.length
    const marcados = container.querySelectorAll("input[type='checkbox']:checked").length

    if (total === 0) {
        barraFill.style.width = "0%"
        barraText.textContent = "0%"
        return
    }

    const porcentagem = Math.round((marcados / total) * 100)

    barraFill.style.width = `${porcentagem}%`
    barraText.textContent = `${porcentagem}%`
}
