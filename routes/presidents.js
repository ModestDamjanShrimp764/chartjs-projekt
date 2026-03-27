const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/presidents.json");

function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

router.get("/", (req,res)=>{
  const presidents = readData();
  res.json(presidents);
});

router.post("/", (req,res)=>{
  const presidents = readData();
  const {name,votes} = req.body;

  if(!name || typeof name !== "string")
    return res.status(400).json({message:"Name ungültig"});

  if(typeof votes !== "number" || votes < 0)
    return res.status(400).json({message:"Votes müssen positiv sein"});

  if(presidents.some(p=>p.name.toLowerCase()===name.toLowerCase()))
    return res.status(400).json({message:"Name existiert bereits"});

  const newId = presidents.length
    ? Math.max(...presidents.map(p=>p.id||0)) + 1
    : 1;

  const newPresident = {
    id: newId,
    name: name.trim(),
    votes
  };

  presidents.push(newPresident);
  writeData(presidents);

  res.status(201).json(newPresident);
});

router.delete("/:id",(req,res)=>{
  const presidents = readData();
  const id = parseInt(req.params.id);

  const index = presidents.findIndex(p=>p.id===id);
  if(index===-1)
    return res.status(404).json({message:"Nicht gefunden"});

  const deleted = presidents.splice(index,1);
  writeData(presidents);

  res.json(deleted[0]);
});

router.put("/:id",(req,res)=>{
  const presidents = readData();
  const id = parseInt(req.params.id);
  const {votes} = req.body;

  const president = presidents.find(p=>p.id===id);
  if(!president)
    return res.status(404).json({message:"Nicht gefunden"});

  if(typeof votes !== "number" || votes < 0)
    return res.status(400).json({message:"Votes müssen positiv sein"});

  president.votes = votes;
  writeData(presidents);

  res.json(president);
});

module.exports = router;