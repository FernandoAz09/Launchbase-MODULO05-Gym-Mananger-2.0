const db = require('../config/db')
const { date } = require('../../lib/utils') // Objeto desestruturado e exportado 


module.exports = {
    all(callback) { // Função dentro de uma função

        db.query(`SELECT * FROM instructors`, function(err, results) {
            if(err) return res.send("Database Error!")

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

        db.query(query, values, function(err, results) {
            if(err) return res.send("Database Error!")
            
            callback(results.rows[0])
        })


    },
    find(id, callback) {
        db.query(`
            SELECT * 
            FROM instructors 
            WERE id = $1`, [id], function(err, results){
                if(err) return res.send("Database Error!")

                callback(results.rows[0])
        })
    }
}