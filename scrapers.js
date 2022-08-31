

const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    // let updatedUrl = url.replace(" ","%20")
    
    const browser = await puppeteer.launch();

    try{
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0'});
    
        const [el] = await page.$x('/html/body/div[1]/div[1]/nav/div/div/div[1]/a[2]/img');
        console.log(el);
        const src = await el.getProperty('src');
        const srcTxt =  await src.jsonValue();
    
        console.log(srcTxt);
    }
    catch(error){
        console.error(error.message)
    }
    finally{
        await browser.close();
    }
   
}
let jobName = "Desarrollador%20web";
let cityName = "Madrid";


// scrapeProduct(`https://es.indeed.com/jobs?q=${jobName}&l=${cityName}%2C%20${cityName}%20provincia&vjk=ce5013cc664af7b3`)
scrapeProduct('https://es.indeed.com/?from=gnav-jobsearch--jasx')