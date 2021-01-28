const { age, date } = require('../../lib/utils') // Objeto desestruturado e exportado 
const Intl = require('intl') // Instalado para formatar a data conforme a região

const Member = require('../models/Member')


module.exports = {    
    index(req, res) {

        Member.all((members) =>{
            return res.render("members/index", { members })
        })

    },
    create(req, res) {

    
        Member.instructorsSelectOptions((options) => { // Criando caixa de seleção de Instrutores
            return res.render("members/create", { instructorOptions: options })

        })

    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.")
            }
        }

        Member.create(req.body, (member) => {
            return res.redirect(`/members/${member.id}`)

        })
        
    },
    show (req, res)  {
        Member.find(req.params.id, (member) => {
            if(!member) return res.send("member not found")

            member.birth = date(member.birth).birthDay

            return res.render("members/show", {member})

        })
    },
    edit (req, res)  {
        Member.find(req.params.id, (member) => {
            if(!member) return res.send("member not found")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions((options) => {  // Podendo editar o instrutor por aqui tbm
                return res.render("members/create", { member, instructorOptions: options })
    
            })
  
        })
    },
    put (req, res)  {
        const keys = Object.keys(req.body);
    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }
            
        Member.update(req.body, () => {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete (req,res) {
        Member.delete(req.body.id, () => {
            return res.redirect("/members")
        })
    }

}
