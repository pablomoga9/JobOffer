const adsSchema = require('../schemas/adsSchemas');


//Require de models de SQL para poder traer las queries de favoritos

const getAds = async(req,res)=>{
    try{
        const getByInputValue= "Query to get by input value"
        res.status(200).json(getByInputValue);
        res.render("dashboardAd");
        res.render("homeNoLog");
        res.render("homeUser");
    }
    catch(error){   
        console.log(error.stack);
        res.status(404).json({"message":"ads not found"});
    }
}

const createAd = async(req,res)=>{
    try{
        const create = "Query to create an ad by admin"
        res.status(200).json(create);
        res.render("dashboardAd")
    }
    catch(error){
        console.log(error.stack);
        res.status(404).json({"message":"could not create"});
    }
}

const updateAd = async(req,res)=>{
    try{
        const update = "Query to update an ad by admin";
        res.status(200).json(update);
        res.render("dashboardAdmin");
    }
    catch(error){
        console.log(error.stack);
        res.status(404).json({"message":"ad not found"});
    }
}

const deleteAd = async(req,res)=>{
    try{
        const delAd = "Query to delete an ad by admin";
        res.status(200).json(delAd);
        res.render("dashboardAdmin");
    }
    catch(error){
        console.log(error.stack);
        res.status(404).json({"message":"ad not found"});
    }
}


module.exports = {
    getAds,
    createAd,
    updateAd,
    deleteAd
}