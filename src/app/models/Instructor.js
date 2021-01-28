const db = require('../config/db')
const { date } = require('../../lib/utils') // Objeto desestruturado e exportado 


module.exports = {
    all(callback) { // Função dentro de uma função

        db.query(`
        SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructor_id = instructors.id)
        GROUP BY instructors.id
        ORDER BY instructors.id ASC`, 
            (err, results) => {
                if(err) throw `Database Error! ${err}`

            callback(results.rows) // Essa função será chamada, mas só após da leitura do banco de dados acima
        })

    },
    create(data,callback) {
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso //created_at 
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })


    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], (err, results) => {
                if(err) throw `Database Error! ${err}`
                callback(results.rows[0])
        })
    },
    update(data,callback) {
        const query = `
        UPDATE instructors SET 
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            services=($5)
        WHERE id = $6
        `
    
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback()
        })
    },
    delete(id,callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}
