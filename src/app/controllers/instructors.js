const { age, date } = require('../../lib/utils') // Objeto desestruturado e exportado 
const Intl = require('intl') // Instalado para formatar a data conforme a região


module.exports = {
    index(req, res) {
        return res.render("instructors/index")
    },
    create(req, res) {
        return res.render("instructors/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos.')
            }
        }

        let { avatar_url, name, birth, gender, services } = req.body

        return

    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos.')
            }
        }

        let { avatar_url, name, birth, gender, services } = req.body


        return
    },
    delete(req, res) {
        return
    }

}

/*  BOA PARTE QUE ESTÁ ABAIXO ESTÁ REESCRITO ACIMA POR MEIO DE SHORTHAND OBJECT PROPERTY -> Propriedades do objeto de maneira mais rápida 
**********************************O RESTANTE SERÁ REFEITO PARA INTEGRAÇÃO DO BANCO DE DADOS***********************************/

/*
// INDEX
exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors }) // renderizando a página inicial e trazendo os dados para a tabela
}

// CREATE
exports.create = function(req, res) { // Rota de criação
    return res.render("instructors/create")
}

// SHOW
exports.show = function(req,res) { 
    const { id } = req.params // desestruturando, retirando o ID do req.params

    const foudInstructor = data.instructors.find(function(instructor){ // Encontrando(com o find) o ID dentro de instructor
        return instructor.id == id // FIND -> BOOLEAN
    })

    if (!foudInstructor) return res.send("Instructor not found!")

    const instructor = { // Configurando os dados apresentados
        ...foudInstructor, // Os ajustes abaixo serão feitos e o restante ficara espalhado dentro do foundInstructors
        age: age(foudInstructor.birth),
        services: foudInstructor.services.split(", "),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foudInstructor.created_at),
    }

    return res.render("instructors/show", { instructor }) // Renderizando os dados na página show.njk
}

// POST
exports.post = function(req, res) { //exportando apenas as functions

    /* ------------------------------ ESTRUTURA DE VALIDAÇÃO ------------------------------
    const keys = Object.keys(req.body)

    for(key of keys) { //Verificando se algum campo(key) está vazio
        if(req.body[key] == "") { // Se algum campo estiver vazio... 
            return res.send('Por favor, preencha todos os campos.') // Envie essa mensagem
        }
    }


    /* ---------------------  Desestruturando o req.body  ---------------------
    
    let {avatar_url, name, birth, gender, services} = req.body // Usando o LET pois poderão ser alteradas
    

    /* --------------------- TRATAMENTO DOS DADOS --------------------- 

    birth = Date.parse(birth) //Transformando e escrevendo as datas de nasc. em milissegundos <--TIMESTAMP
    const created_at = Date.now() // Adicionando e escrevendo a data de criação em milissegundos <--TIMESTAMP
    const id = Number(data.instructors.length + 1) // Adicionando um ID numeral crescente ao instrutor
    

    /* --------------------- Escrevendo no data.json --------------------- 

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) 
    

    /* --------------------- TRANSFORMANDO OS DADOS DIGITADOS EM JSON ---------------------

// Módulo.função(CAMINHO(path), CONSTRUCTOR JSON.método conversor(onde passará os valores, null, 2 espaços).MÉTODO(VALOR), FUNCTION(CALLBACK))

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error.") 

        return res.redirect("/instructors")
    })

    // Corpo da requisição POST por isso req.body
    // return res.send(req.body)
}

// EDIT
exports.edit = function(req, res) {

    const { id } = req.params // desestruturando, retirando o ID do req.params

    const foudInstructor = data.instructors.find(function(instructor){ // Encontrando(com o find) o ID dentro de instructor
        return instructor.id == id // FIND -> BOOLEAN
    })

    if (!foudInstructor) return res.send("Instructor not found!")
    
    const instructor = {
        ...foudInstructor,
        birth: date(foudInstructor.birth).iso
    }

    return res.render("instructors/edit", {instructor})  // Recebendo o id + usando o botão para editar os dados
}

// PUT
exports.put = function(req, res) {
    const { id } = req.body 
    let index = 0


    const foudInstructor = data.instructors.find(function(instructor, foundIndex){ // Encontrando(com o find) o ID dentro de instructor
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foudInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foudInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/instructors/${id}`)
    })
}

// DELETE
exports.delete = function(req,res) {
    const { id } = req.body 

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
}


// req.query -> recebendo pela instrução da rota -> ?id=1
// req.body -> recebendo a partir do corpo da requisição(form)
// req.params-> recebendo pela instrução da rota -> /:id/:

*/