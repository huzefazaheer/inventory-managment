require("dotenv").config({path:"./.env"})
const express = require('express')
const path = require('path')
const { getAllItems } = require("./models/db")
const app = express()
const PORT = process.env.PORT || 8080

const staticPath = path.join(__dirname, "/static")
app.use(express.static(staticPath))
const viewsPath = path.join(__dirname, "/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

app.get("/", async (req, res) => {
    const data = await getAllItems()
    res.render('index', {data: data})
})

app.listen(PORT, ()=> [
    console.log("Server started on port: " + PORT)
])