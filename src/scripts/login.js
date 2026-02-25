const btn = document.getElementById("btn-logar")
const inputEmail = document.getElementById("email-login")
const inputSenha = document.getElementById("senha-login")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    logar()
})

function logar() {

    const email = inputEmail.value.trim()
    const senha = inputSenha.value.trim()

    if (!email || !senha) {
        alert("Preencha todos os campos.")
        return
    }

    fetch(`http://localhost:3000/usuarios?email=${email}`)
        .then(res => res.json())
        .then(usuarios => {

            if (usuarios.length === 0) {
                alert("Email não encontrado.")
                return
            }
            const usuario = usuarios[0]

            if (usuario.senha === senha) {

                alert("Login realizado com sucesso!")

                sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario))

                window.location.href = "home.html"

            } else {
                alert("Senha incorreta.")
            }

        })
}    