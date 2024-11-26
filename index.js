const express= require("express")
const mongoose=require('mongoose')
const cors= require("cors")
const Personal_informationModel = require('./models/Personal_information')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/personal_information");


app.post('/biodata', async (req, res) => {
    try {
        const { name } = req.body;
        const existingData = await Personal_informationModel.findOne({ name: name });
        if (existingData) {
            return res.status(400).json({ message: "Already exists!" });
        } else {
            const personal_informations = await Personal_informationModel.create(req.body);
            return res.json(personal_informations);
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
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