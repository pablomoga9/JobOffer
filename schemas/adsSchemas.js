const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
//ESQUEMA PROVISIONAL
const schema = new mongoose.Schema({
    search:{
        type: String
    },
    title:{
        type: String
    },
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
    },
    adminAd:{
        type: Boolean
    },
    province:{
        type: String
    }
})

schema.plugin(autoIncrement.plugin,{model:'ads', field: 'adId'});
const Ads = mongoose.model('ads', schema);
module.exports = Ads;