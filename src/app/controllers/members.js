const { age, date } = require('../../lib/utils') // Objeto desestruturado e exportado 
const Intl = require('intl') // Instalado para formatar a data conforme a região


module.exports = {
    index(req, res) {
        return res.render("members/index")
    },
    create(req, res) {
        return res.render("members/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos.')
            }
        }

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