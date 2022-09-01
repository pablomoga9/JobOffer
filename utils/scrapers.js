

const puppeteer = require('puppeteer');

const extractAdsData = async(url,browser)=>{
    try{
        const adData = {};
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        //await page.goto(`https://es.indeed.com/ofertas?l=${nombreCiudad}`)
        await page.goto('https://es.indeed.com/ofertas?l=Madrid');

        //Cada tarjeta tendrá imagen de empresa, título del puesto, nombre de la empresa, ciudad, presencial/remoto/híbrido, fecha de subida de la oferta, descripción, tipo de contrato, tipo de jornada y salario anual
        
        // adData['wage'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(8) > li:nth-child(2)',wage=>wage.innerText);
        console.log("ok")
        const titles = await page.$$('td.resultContent > div > h2 > a > span');
        const companyName = await page.$$('span.companyName > a')
        console.log(titles[1]);
        for(let i = 0; i< titles.length;i++){
            const element = titles[i];
            const titlesText = await page.evaluate(element=>element.textContent, element);
            console.log(titlesText);
        }
        
        // const data = awaitpage.evaluate(()=>{
        //     console.log("okok")
        //     const title = document.querySelector('td.resultContent > div > h2 > a > span').innerHTML;
        //     const companyName = document.querySelector('span.companyName > a').innerHTML;

        //     return {
        //         title,
        //         companyName,
        //         try1:console.log("okokok")
        //     }
        // });
        
        // adData['card'] = await page.$$('.job_seen_beacon');
        console.log(data);
    //    adData.map((element)=>{
           
    //    })

        return adData;

    }
    catch(error){
        return {error:error}
    }
} 

extractAdsData();

// const scrap = async (url) =>{
//     try{
//         const scrapedData = [];
//     }
//     catch(error){
       
//     }
// }