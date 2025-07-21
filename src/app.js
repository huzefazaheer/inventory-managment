require("dotenv").config({path:"./.env"})
const express = require('express')
const path = require('path')
const { getAllItems, getAllByCat, removeById, addItem, getById, updateById, getAllBySearch, searchByName, searchByPartId } = require("./models/db")
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))
const viewsPath = path.join(__dirname, "/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

function getEqualData(){

}

app.get("/", async (req, res) => {
    let allData = await getAllItems();
    if(req.query.cat){
        const data = await getAllByCat(req.query.cat)
        allData = allData.filter(data1 => {
            return data.some(data2 => data1.id == data2.id)
        })
    }else if(req.query.sn){
        const data = await searchByName(req.query.sn)
        allData = allData.filter(data1 => {
            return data.some(data2 => data1.id == data2.id)
        })
    }else if(req.query.sid){
        const data = await searchByPartId(req.query.sid)
        allData = allData.filter(data1 => {
            return data.some(data2 => data1.id == data2.id)
        })
    }

    res.render('index', {data: allData})
    
})

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

app.get("/new", (req, res) => {
    res.render('newitem', {values:emptyitem, action:"/new", headingtxt:"Add Item"})
})

app.post("/new", (req, res) => {
    const item = req.body;
    addItem(item)
    res.redirect("/")
})

app.get("/edit/:id", async (req, res) => {
    const data = await getById(req.params.id)
    res.render('newitem', {values:data[0], action:"/edit/"+req.params.id, headingtxt:"Edit Item"})
})

app.post("/edit/:id", async (req, res) => {
    const item = req.body;
    await updateById(req.params.id, item)
    res.redirect("/")
})

app.get("/delete/:id", (req, res) => {
    if(req.params.id){
        removeById(req.params.id)
        res.redirect("/")
    }
})

app.listen(PORT, ()=> [
    console.log("Server started on port: " + PORT)
])