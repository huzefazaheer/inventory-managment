require("dotenv").config({path:"./.env"})
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

const staticPath = path.join(__dirname, "/static")
app.use(express.static(staticPath))
const viewsPath = path.join(__dirname, "/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

app.get("/", (req, res) => {
    res.render('index')
})

app.listen(PORT, ()=> [
    console.log("Server started on port: " + PORT)
])