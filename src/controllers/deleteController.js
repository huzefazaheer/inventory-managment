const { removeById } = require("../models/db")

function getDelete(req, res) {
    if(req.params.id){
        removeById(req.params.id)
        res.redirect("/")
    }
}

module.exports = {getDelete}