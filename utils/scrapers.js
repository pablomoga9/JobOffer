

const puppeteer = require('puppeteer');

const extractAdsData = async(url,browser)=>{
    try{
        const adData = {};
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        //await page.goto(`https://es.indeed.com/ofertas?l=${nombreCiudad}`)
        await page.goto('https://es.indeed.com/ofertas?l=Madrid');

        //Cada tarjeta tendrá imagen de empresa, título del puesto, nombre de la empresa, ciudad, presencial/remoto/híbrido, fecha de subida de la oferta, descripción, tipo de contrato, tipo de jornada y salario anual
        
        // adData['img'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-media > a > figure > div > div > div > figure > picture > img', img=>img.src);
        
        // adData['title'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > h2 > a', title=>title.innerText);
        
        // adData['company'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > h3 > a',company=>company.innerText);
        
        // adData['city'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(6) > li:nth-child(1) > span', city=>city.innerText);
        
        // adData['attendance'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(6) > li:nth-child(2)', attendance=>attendance.innerText);
        
        // adData['date'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(6) > li:nth-child(3) > span', date=>date.innerText);
        
        // adData['description'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > p',description=>description.innerText);
        
        // adData['contract'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(8) > li:nth-child(1)',contract=>contract.innerText);
        
        // adData['hours'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(8) > li:nth-child(2)', hours=>hours.innerText);
        
        // adData['wage'] = await page.$eval('#app > div > div > div.ij-AdvertisingRoadblock > div.ij-AdvertisingRoadblockContainer > div.ij-AdvertisingRoadblockContainerChild > div > div > div.ij-ContentSearch-main > div.ij-ContentSearch-list > ul > li:nth-child(1) > div > div.sui-AtomCard-info > div > ul:nth-child(8) > li:nth-child(2)',wage=>wage.innerText);
        console.log("ok")

        adData['card'] = await page.$$('#jobTitle-179cb34dbbaea635');
        console.log(adData[0].innerHTML);
        // for(let i = 0; i < adData.length; i++){
        //     const element = adData[i];
        //     console.log(element);
        // }
        
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