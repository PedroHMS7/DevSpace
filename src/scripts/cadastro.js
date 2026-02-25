const inputNome = document.getElementById("nome-cadastro")
const inputEmail = document.getElementById("email-cadastro")
const inputSenha = document.getElementById("senha-cadastro")
const btn = document.getElementById("btn-cadastro")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    cadastrar()
})

function cadastrar() {
    const nome = inputNome.value.trim()
    const email = inputEmail.value.trim()
    const senha = inputSenha.value.trim()

    if (nome.length < 3) {
        alert("O nome deve ter no mínimo 3 caracteres.")
        return
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailValido.test(email)) {
        alert("Digite um email válido.")
        return
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.")
        return
    }

    fetch(`http://localhost:3000/usuarios?email=${email}`)
        .then(res => res.json())
        .then(usuarios => {

            if (usuarios.length > 0) {
                alert("Este email já está cadastrado.")
                return
            }

            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha
                })
            })
                .then(res => res.json())
                .then(data => {
                    alert("Cadastro realizado com sucesso!")
                    
                    // limpar campos
                    inputNome.value = ""
                    inputEmail.value = ""
                    inputSenha.value = ""

                    window.location.href = "login.html"   
                })           
        })
}