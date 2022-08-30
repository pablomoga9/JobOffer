const mongoose = require('mongoose');

//ESQUEMA PROVISIONAL
const schema = new mongoose.Schema({
    job:{
        type: String
    },
    id:{
        type: Number,
        unique: true
    },
    city:{
        type: String
    },
    date:{
        type: Date
    }
})

const Ads = mongoose.model('ads', schema);
module.exports = Ads;