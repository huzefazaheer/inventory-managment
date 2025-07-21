const { addItem } = require("../models/db");

const emptyitem = {
    id: 0,
    partno: '',
    name: '',
    category: '',
    description: '',
    manufacturer: '',
    value: '',
    datasheet_url: ''
  }

function getCreate(req, res) {
    res.render('newitem', {values:emptyitem, action:"/new", headingtxt:"Add Item"})
}

function postCreate(req, res) {
    const item = req.body;
    addItem(item)
    res.redirect("/")
}

module.exports = {getCreate, postCreate}