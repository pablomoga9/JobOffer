const {MongoClient} = require('mongodb');

describe('insert ad', ()=>{
    let connection;
    let db;

    beforeAll(async()=>{
        connection = await MongoClient.connect(`mongodb+srv://pablo9:${process.env.DBPASS}@jobads.fhisfl5.mongodb.net/adsDB?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db('adsDB');
    });

    afterAll(async()=>{
        await connection.close();
    });

    it('insert ad into collection', async()=>{
        const ads = db.collection('adsDB');
        const adExample = {title:'new job', city:'Madrid'};
        await ads.insertOne(adExample);

        const alreadyInserted = await ads.findOne({title:'new job'});
        expect(alreadyInserted).toEqual(adExample);
    }) 
})