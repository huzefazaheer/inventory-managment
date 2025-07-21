const { validationResult, body } = require("express-validator");
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
    res.render('newitem', {values:emptyitem, action:"/new", headingtxt:"Add Item", errors:[{msg:''}]})
}

const postCreate = [
    body("name").notEmpty().withMessage("Please fill out the Name").trim().isLength({max:20, min:2}).withMessage("Invalid length of Name"),
    body("partno").notEmpty().withMessage("Please fill out the Part Number").trim().isLength({max:30, min:2}).withMessage("Invalid length of Part Number"),
    body("manufacturer").notEmpty().withMessage("Please fill out the Manufaturer").trim().isLength({max:20, min:2}).withMessage("Invalid length of Manufacturer"),
    body("datasheet_url").trim().isLength({max:100, min:2}).withMessage("Invalid length of URL").matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
    body("description").trim().isLength({max:650, min:2}).withMessage("Invalid length of Description"),
    body("specs").trim().isLength({max:600, min:2}).withMessage("Invalid length of Specs").isJSON().withMessage("Please enter valid json specs")
    
    ,
    function p(req, res) {
        const errors = validationResult(req)
        const item = req.body;
        if(req.isAdmin){
            if(errors.isEmpty()){
            addItem(item)
            res.redirect("/")
        }else{
            res.render('newitem', {values:item, action:"/new", headingtxt:"Add Item",  errors:errors.array()})
        }
        }else{
            res.redirect("/")
        }
    }
]

module.exports = {getCreate, postCreate}