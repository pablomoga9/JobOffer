const app = require('../app');
const supertest = require("supertest");
const request = supertest(app);

describe('check endpoint',()=>{
    afterAll(async()=>{
        await app.close();
    });

    it('test GET /search endpoint', async()=>{
        const response = await request.get("/search");
        expect(response.body).not.toBe([]);
        expect(response.status).toBe(200);
    })

    it('test POST /ads/create endpoint', async()=>{
        await request
            .post('/ads/create')
            .send({
                title:"title example",
                id:'id example',
                date:'date example',
                city:'city example'
            })
            .set('Accept', /application\/json/)
            .expect(200)
    })


})