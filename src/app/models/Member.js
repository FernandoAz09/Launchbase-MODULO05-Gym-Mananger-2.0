const db = require('../config/db')
const { date } = require('../../lib/utils') // Objeto desestruturado e exportado 


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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
    find(id, callback) {  
        db.query(`
            SELECT members.*, instructors.name AS instructor_name 
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
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM members
            ) AS total`

        if ( filter ) {
            filterQuery = `${query}
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) as total`
        }

        query = `SELECT members.*, ${totalQuery}
        FROM members
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database error! ${err}`  
            callback(results.rows)
        })
    }
}
