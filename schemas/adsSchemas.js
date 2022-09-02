const mongoose = require('mongoose');

//ESQUEMA PROVISIONAL
const schema = new mongoose.Schema({
    search:{
        type: String
    },
    title:{
        type: String
    },
    // _id:{
    //     type: Number,
    //     unique: true
    // },
    titleUrl:{
        type: String
    },
    city:{
        type: String
    },
    date:{
        type: String
    },
    company:{
        type: String
    },
    description:{
        type: String
    }
})

const Ads = mongoose.model('ads', schema);
module.exports = Ads;