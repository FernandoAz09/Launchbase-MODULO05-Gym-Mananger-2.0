// Incluindo o active na página atual

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href")) ) {
        item.classList.add('active')
    }
}

// Validação de DELETE

const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja Deletar?")
    if(!confirmation) { //se clicar no cancelar
        event.preventDefault() // ele previne o delete
    }
})

