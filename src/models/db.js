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

async function addItem(item) {
    await pool.query("INSERT INTO inventory (partno, name, category, description, manufacturer, value, datasheet_url) VALUES ($1, $2, $3, $4, $5, $6, $7)", [item.partid, item.name, item.cat, item.desc, item.manu, item.value, item.dsheet])
}

module.exports = {
    getAllItems, getAllByCat, removeById, addItem
}