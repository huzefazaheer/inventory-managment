require("dotenv").config({path:"./.env"})
const express = require('express')
const path = require('path')
const { getAllItems, getAllByCat, removeById, addItem, getById, updateById, getAllBySearch, searchByName, searchByPartId } = require("./models/db")
const { getHome, getDetail } = require("./controllers/indexController")
const { getCreate, postCreate } = require("./controllers/createController")
const { postEdit, getEdit } = require("./controllers/editController")
const { getDelete } = require("./controllers/deleteController")
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath))
const viewsPath = path.join(__dirname, "/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

app.get("/", getHome)

app.get("/item/:id", getDetail)

app.get("/new", getCreate)

app.post("/new", postCreate)

app.get("/edit/:id", getEdit)

app.post("/edit/:id", postEdit)

app.get("/delete/:id", getDelete)

app.listen(PORT, ()=> [
    console.log("Server started on port: " + PORT)
])

//TODO: Add admin protection
//TODO: Work on detail page