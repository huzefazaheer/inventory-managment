const { getById, getAllItems, getAllByCat, searchByName, searchByPartId } = require("../models/db");

async function getHome(req, res) {
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

    res.render('index', {data: allData, cat:req.query.cat, sn:req.query.sn, sid:req.query.sid})
    
}


async function getDetail(req, res) {
    const {id} = req.params
    const item = await getById(id)
    console.log(item[0])
    res.render("detail", {item: item[0]})
}


module.exports = {getHome, getDetail}