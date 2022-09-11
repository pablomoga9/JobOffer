const adsSchema = require('../schemas/adsSchemas');
const scraper = require('../utils/scrapers');
const pdfService = require('../utils/pdf-service')

const getAds = async(req,res)=>{
    try{
            if(req.query.admin){
                
                const findAdmin = await adsSchema.find({adminAd:true});
                
                return res.status(200).json(findAdmin);
            }
            else if(req.query.title){
                console.log(req.query.title);
                
                const findId = await adsSchema.find({title:req.query.title})
                return res.status(200).json(findId);
            }
            else if(req.query.pdf){
                console.log("hi")
                const findAdmin = await adsSchema.find({adminAd:true});
                const stringPdf = findAdmin.toString();
                const stream = res.writeHead(200,{
                    'Content-Type':'application/pdf',
                    'Content-Disposition':'attachment;filename=invoice.pdf'
                });
                pdfService.buildPDF(
                    ()=> stream.write(stringPdf),
                    () => stream.end()
                )
            }
            else{
                
                const searchJob = req.query.job;//Esto será el valor del input de la barra de búsqueda de puesto de trabajo
                const searchProvince = req.query.city
                const findJob = await adsSchema.find({search:searchJob,province:searchProvince},"-_id");//Comprobamos si ya hay registros en Mongo de Ads que tengan el mismo nombre de empleo que estamos buscando
                    
                if(Object.entries(findJob).length===0){//Si no los hay, traemos los datos del scraping a Mongo y hacemos render directamente del scrap
                        const getByInputValue = await scraper.extractAllData(req.query.city,"",searchJob);//Se le pasa a la función de scraping el valor del input de la barra de búsqueda para la ciudad, el browser y la variable searchJob
                        
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
        const create = new adsSchema(req.body)
        const saveAd = await create.save();
        res.status(200).json({"message":"ok"});
       
        
    }
    catch(error){
        console.log(error.stack);
        res.status(404).json({"message":"could not create"});
    }
}

const updateAd = async(req,res)=>{
    try{
        const update = req.body;
        console.log(req.body);
        const findById = await adsSchema.findByIdAndUpdate({_id:(req.body._id).toString()},update);
        findById.overwrite(update);
        findById.save();
        return findById;
    }
    catch(error){
        console.log(error.stack);
        res.status(404).json({"message":"ad not found"});
    }
}

const deleteAd = async(req,res)=>{
    try{
        const deleteId = req.query.id;
        const findById = await adsSchema.deleteOne({_id:deleteId});
        return findById
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