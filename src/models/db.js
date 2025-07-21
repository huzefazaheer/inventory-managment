const pool = require("./pool")

async function getAllItems(){
    const {rows} = await pool.query("SELECT * FROM inventory")
    return rows 
}

async function getAllByCat(category) {
    const {rows} = await pool.query("SELECT * FROM inventory WHERE category = $1", [category])
    return rows
}

async function removeById(id) {
    await pool.query("DELETE FROM inventory WHERE id = $1", [id])
}

module.exports = {
    getAllItems, getAllByCat, removeById
}