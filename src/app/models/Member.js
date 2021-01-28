const db = require('../config/db')
const { date } = require('../../lib/utils') // Objeto desestruturado e exportado 
const instructors = require('../controllers/instructors')


module.exports = {
    all(callback) { // Função dentro de uma função

        db.query(`SELECT * FROM members`, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback(results.rows) // Essa função será chamada, mas só após da leitura do banco de dados acima
        })

    },
    create(data,callback) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })


    },
    find(id, callback) { // Trazendo o id do instrutor para mostrar o nome dele 
        db.query(`
            SELECT members.*, instructor.name AS instructor_name 
            FROM members 
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, [id], (err, results) => {
                if(err) throw `Database Error! ${err}`
                callback(results.rows[0])
        })
    },
    update(data,callback) {
        const query = `
        UPDATE members SET 
            avatar_url=($1),
            name=($2),
            email=($3),
            birth=($4),
            gender=($5),
            blood=($6),
            weight=($7),
            height=($8),
            instructor_id=($9)
        WHERE id = $10
        `
    
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback()
        })
    },
    delete(id,callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },
    instructorsSelectOptions(callback) { // SELECIONAR O INSTRUTOR
        db.query(`SELECT name, id FROM instructors`, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
}
