const { isAdmin } = require("../app")
const { removeById } = require("../models/db")

function getDelete(req, res) {
    console.log(req.isAdmin)
    if(req.params.id && req.isAdmin){
        removeById(req.params.id)
        res.redirect("/")
    }else{
        res.redirect("/")
    }
}

module.exports = {getDelete}