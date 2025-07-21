const pool = require("./pool")

async function getAllItems(){
    const {rows} = await pool.query("SELECT * FROM inventory")
    return rows 
}

async function getById(id){
    const {rows} = await pool.query("SELECT * FROM inventory WHERE id = $1", [id])
    return rows 
}

async function getAllByCat(category) {
    const {rows} = await pool.query("SELECT * FROM inventory WHERE category = $1", [category])
    return rows
}

async function searchByName(name) {
    name += "%"
    const {rows} = await pool.query("SELECT * FROM inventory WHERE name ILIKE ($1)", [name+"%"])
    return rows
}

async function searchByPartId(id) {
    id += "%"
    const {rows} = await pool.query("SELECT * FROM inventory WHERE partno ILIKE ($1)", [id])
    return rows
}

async function removeById(id) {
    await pool.query("DELETE FROM inventory WHERE id = $1", [id])
}

async function addItem(item) {
    await pool.query("INSERT INTO inventory (partno, name, category, description, manufacturer, specs, datasheet_url) VALUES ($1, $2, $3, $4, $5, $6, $7)", [item.partno, item.name, item.cat, item.description, item.manufacturer, JSON.parse(item.specs), item.datasheet_url])
}

async function updateById(id1,item) {
    await pool.query("UPDATE inventory SET partno = $1, name = $2, category = $3, description = $4, manufacturer = $5, specs = $6, datasheet_url = $7 WHERE id = $8",
        [item.partno, item.name, item.cat, item.description, item.manufacturer, JSON.parse(item.specs), item.datasheet_url, id1])
}

module.exports = {
    getAllItems, getAllByCat, removeById, addItem, getById, updateById, searchByName, searchByPartId
}