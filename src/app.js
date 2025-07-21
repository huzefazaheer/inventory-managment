require("dotenv").config({path:"./.env"})
const express = require('express')
const path = require('path')
const { getAllItems, getAllByCat, removeById } = require("./models/db")
const app = express()
const PORT = process.env.PORT || 8080

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))
const viewsPath = path.join(__dirname, "/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

app.get("/", async (req, res) => {
    if(req.query.cat){
        const data = await getAllByCat(req.query.cat)
        res.render('index', {data: data})
    }else{
        const data = await getAllItems()
        res.render('index', {data: data})
    }
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