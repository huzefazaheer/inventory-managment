const { body, validationResult } = require("express-validator");
const { getById, updateById } = require("../models/db");

async function getEdit(req, res) {
    const data = await getById(req.params.id)
    res.render('newitem', {values:data[0], action:"/edit/"+req.params.id, headingtxt:"Edit Item", errors:[{msg:''}]})
}

const postEdit = [
    body("name").notEmpty().withMessage("Please fill out the Name").trim().isLength({max:20, min:2}).withMessage("Invalid length of Name"),
    body("partno").notEmpty().withMessage("Please fill out the Part Number").trim().isLength({max:30, min:2}).withMessage("Invalid length of Part Number"),
    body("manufacturer").notEmpty().withMessage("Please fill out the Manufaturer").trim().isLength({max:20, min:2}).withMessage("Invalid length of Manufacturer"),
    body("datasheet_url").trim().isLength({max:100, min:2}).withMessage("Invalid length of URL").matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
    body("description").trim().isLength({max:650, min:2}).withMessage("Invalid length of Description"),
    body("specs").trim().isLength({max:600, min:2}).withMessage("Invalid length of Specs").isJSON().withMessage("Please enter valid json specs")
    
    ,
    async function p(req, res){
    const errors = validationResult(req)
    const item = req.body;
    if(req.isAdmin){
        if(errors.isEmpty()){
        await updateById(req.params.id, item)
        res.redirect("/") 
    }else {
        const data = await getById(req.params.id)
        res.render('newitem', {values:item, action:"/edit/"+req.params.id, headingtxt:"Edit Item", errors:errors.array()})
    }
    }else{
        res.redirect("/")
    }
    }
]

module.exports = {getEdit, postEdit}