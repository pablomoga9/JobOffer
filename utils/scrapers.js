

const { type } = require('express/lib/response');
const puppeteer = require('puppeteer');

const extractAdsData = async(province,browser,search)=>{
    try{
       //En la URL no puede haber espacios, son todos sustituidos por "%20"
       const searchNoSpace = search.replaceAll('%20',' ')
        let scrapedData = [];
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
       //La URL 
        await page.goto(`https://es.indeed.com/jobs?q=${search}&l=${province}`);
        
        const titles = await page.$$('td.resultContent > div > h2 > a > span');
        const companyName = await page.$$('span.companyName > a'&&'span.companyName');
        const city = await page.$$('div.companyLocation');
        const description = await page.$$('div.job-snippet > ul > li');
        const publishDate = await page.$$('span.date')
        const offerUrl = await page.$$('h2.jobTitle > a'); 
        
        for(let i = 0; i < titles.length;i++){
            
            //Title
            const elementTitle = titles[i];
            const titlesText = await page.evaluate(element=>element.textContent, elementTitle);

            //CompanyName
            const elementCompany = companyName[i];
            const companyText = await page.evaluate(element=>element.textContent,elementCompany);

            //City
            const elementCity = city[i];
            const cityText = await page.evaluate(element=>element.textContent,elementCity);

            //Description
            const elementDescription = description[i];
            const descriptionText = await page.evaluate(element=>element.textContent,elementDescription);

            //PublishDate
            const elementDate = publishDate[i];
            const dateText = await page.evaluate(element=>element.textContent,elementDate);

            //OfferUrl
            const elementUrl = offerUrl[i];
            const offerUrlText = await page.evaluate(element=>element.href,elementUrl);

            scrapedData.push({
                search: search,
                title: titlesText,
                titleUrl: offerUrlText,
                city: cityText,
                date: dateText,
                company: companyText,
                description: descriptionText
            });
            
        }
         console.log(scrapedData);
        return scrapedData;

    }
    catch(error){
        return {error:error}
    }
} 

// extractAdsData("Madrid","","desarrollador");
module.exports = {
    extractAdsData
}