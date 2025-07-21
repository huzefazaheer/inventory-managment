const { getById, updateById } = require("../models/db");

async function getEdit(req, res) {
    const data = await getById(req.params.id)
    res.render('newitem', {values:data[0], action:"/edit/"+req.params.id, headingtxt:"Edit Item"})
}

async function postEdit(req, res){
    const item = req.body;
    await updateById(req.params.id, item)
    res.redirect("/")
}

module.exports = {getEdit, postEdit}