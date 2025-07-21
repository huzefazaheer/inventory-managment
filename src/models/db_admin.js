const pool = require("./pool")

async function getAdmin(name, pass){
    const {rows} = await pool.query("SELECT * FROM admin WHERE name = $1 AND pass = $2", [name, pass])
    console.log(rows)
    return rows 
}

module.exports = {
    getAdmin
}