const adsSchema = require('../schemas/adsSchemas');
const scraper = require('../utils/scrapers');


const getAds = async(req,res)=>{
    try{
            if(req.query.admin){
                const findAdmin = await adsSchema.find({admin:true});
                return findAdmin;
            }
            else{
                const searchJob = req.query.job.toLowerCase();//Esto será el valor del input de la barra de búsqueda de puesto de trabajo
                const searchProvince = req.query.city
                const findJob = await adsSchema.find({search:searchJob,province:searchProvince},"-_id");//Comprobamos si ya hay registros en Mongo de Ads que tengan el mismo nombre de empleo que estamos buscando
                    
                if(Object.entries(findJob).length===0){//Si no los hay, traemos los datos del scraping a Mongo y hacemos render directamente del scrap
                        const getByInputValue = await scraper.extractAdsData(req.query.city,"",searchJob);//Se le pasa a la función de scraping el valor del input de la barra de búsqueda para la ciudad, el browser y la variable searchJob
                        // console.log(getByInputValue)
                        for(i = 0; i < getByInputValue.length; i++){
                                
                                    let adDoc = new adsSchema(getByInputValue[i]);
                                    let saveAd = await adDoc.save();
                                
                            }
                        
                            return    res.status(200).json(getByInputValue);         
                }
                else{
                            return res.status(200).json(findJob);//Si ya hay documentos en Mongo con este título de empleo, hacemos render de aquellos que se hayan encontrado con findJob
                }
        
            }
           
    
      
       
      
       
       
    }
    catch(error){   
        console.log(error.stack);
        res.status(404).json({"message":"ads not found"});
    }
}

const createAd = async(req,res)=>{
    try{
        
        console.log("hola");
        const create = new adsSchema({
            search:req.query.job,
            title: req.query.title,
            titleUrl: req.query.url,
            city:req.query.city,
            date:req.query.date,
            company:req.query.company,
            description: req.query.description,
            adminAd: true
        })
        
        const saveAd = await create.save();
        
        console.log(saveAd)
        
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