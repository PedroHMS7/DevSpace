const botaoTopico = document.getElementById("topico-btn")
const modal = document.getElementById("modal")
const confirmar = document.getElementById("confirmar")
const cancelar = document.getElementById("cancelar")
const inputNome = document.getElementById("nome-topico")
const container = document.getElementById("topico-container")
const barraFill = document.getElementById("barra-prog-fill")
const barraText = document.getElementById("barra-prog-text")
const params = new URLSearchParams(window.location.search)
const trilhaId = params.get("id")

if (!trilhaId) {
    alert("Trilha inválida")
    window.location.href = "home.html"
}


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

    const topico = {
        nome: "",
        criadaEm: new Date()
    };

    salvarTopico(nome)
    modal.classList.add("hidden")
})

function salvarTopico(nome) {
    fetch("http://localhost:3000/topicos", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            trilhaId: trilhaId,
            concluido: false
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Tópico salvo: ", data)
            criarTopico(data)
        })
}

function criarTopico(topico) {
    const card = document.createElement("div")
    card.classList.add("topico-card")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = topico.concluido == true

    checkbox.addEventListener("change", () => {
        atualizarProgresso()
        salvarStatusTopico(topico.id, checkbox.checked)
    })

    const label = document.createElement("label")
    label.textContent = topico.nome

    card.appendChild(checkbox)
    card.appendChild(label)

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"
    botaoExcluir.classList.add("btn-delete")

    botaoExcluir.addEventListener("click", (event) => {
        event.stopPropagation()

        if (confirm("Deseja excluir o tópico?")) {
            fetch(`http://localhost:3000/topicos/${topico.id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(resp => {
                    if (resp.ok) {
                        card.delete()
                        alert("Tópico excluido com sucesso")
                    } else {
                        alert("Erro ao deletar")
                    }
                })
                .catch(error => console.error("Erro: ", error))

        }
    })

card.appendChild(botaoExcluir)
container.appendChild(card)


modal.classList.add("hidden")

atualizarProgresso()
}

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

function salvarStatusTopico(id, concluido) {
    fetch(`http://localhost:3000/topicos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ concluido })
    });
  }
  

function carregarTopico() {
    fetch(`http://localhost:3000/topicos?trilhaId=${trilhaId}`)
        .then(res => res.json())
        .then(topicos => {
            topicos.forEach(topico => criarTopico(topico))
        })
}

carregarTopico()

fetch(`http://localhost:3000/trilhas/${trilhaId}`)
    .then(res => res.json())
    .then(trilha => {
        console.log("Trilha carregada:", trilha)
    })