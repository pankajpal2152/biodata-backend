const express= require("express")
const mongoose=require('mongoose')
const cors= require("cors")
const Personal_informationModel = require('./models/personal_information')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/personal_information");


app.post('/biodata', (req, res) => {
    const { name } = req.body;

    // Check if the biodata with the same name already exists
    Personal_informationModel.findOne({ name: name })
        .then(existingData => {
            if (existingData) {
                // If exists, send a response indicating that
                return res.status(400).json({ message: "Already exists!" });
            } else {
                // If not exists, create a new record
                Personal_informationModel.create(req.body)
                    .then(personal_informations => res.json(personal_informations))
                    .catch(err => res.status(500).json(err));
            }
        })
        .catch(err => res.status(500).json(err));
});

app.get('/biodata', (req, res) => {
    const { name } = req.query;

    Personal_informationModel.find({ name: name })
        .then(personal_informations => res.json(personal_informations))
        .catch(err => res.json(err));
});

app.listen(3001,()=>{
    console.log("server is running")
})