const mongoose=require('mongoose')

const Personal_informationSchema= new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    father:{type: String, required: true, unique: true},
    mother:{type: String, required: true, unique: true},
    age:{type: Number, required:true},
    email: String,
});

const Personal_informationModel=mongoose.model('personal_informations',Personal_informationSchema)
module.exports=Personal_informationModel;