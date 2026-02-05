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

  const trilha = {
    nome: "Front-end",
    criadaEm: new Date()
  };

  salvarTrilha(nome)
  modal.classList.add("hidden");

})

function salvarTrilha(nome) {
fetch("http://localhost:3000/trilhas", {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify({
    nome: nome
  })
})
.then(res=>res.JSON())
.then(data=> {
  console.log("Trilha salva: ", data)
  criarCard(data)
})
}

function criarCard(trilha) {
  const card = document.createElement("div");
  card.classList.add("trilha-card");
  card.textContent = trilha.nome;

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.classList.add("btn-delete");

  const botaoEditar = document.createElement("button")
  botaoEditar.textContent= "Editar"
  botaoEditar.classList.add("btn-editar")

  card.addEventListener("click", () => {
    window.location.href = `trilha.html?id=${trilha.id}`;
  });

  botaoExcluir.addEventListener("click", (event) => {
    event.stopPropagation(); 
    
    if (confirm("Deseja realmente excluir?")) {
      fetch(`http://localhost:3000/trilhas/${trilha.id}`, { 
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          card.remove(); 
          alert("Card excluído com sucesso!");
        } else {
          alert("Erro ao deletar");
        }
      })
      .catch(error => console.error("Erro: ", error));
    }
  });

  botaoEditar.addEventListener("click", (event) => {
    event.stopPropagation()

    const novoNome = prompt("Editar nome da trilha: ", trilha.nome)

    if(!novoNome || !novoNome.trim()) return

    fetch(`http://localhost:3000/trilhas/${trilha.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        nome: novoNome
      })
    })
    .then(res=>res.json())
    .then(trilhaAtualizada => {
      card.childNodes[0].textContent = trilhaAtualizada.nome
    })
    .catch(error => console.error("Erro ao editar: ", error))
  })

  card.appendChild(botaoEditar);
  card.appendChild(botaoExcluir);
  container.appendChild(card);
}

function carregarTrilhas() {
  fetch("http://localhost:3000/trilhas")
    .then(res => res.json())
    .then(trilhas => {
      trilhas.forEach(trilha => criarCard(trilha))
    })
}

carregarTrilhas()

