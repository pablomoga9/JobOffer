let jobSearch = document.getElementById('job');
let titleSearch = document.getElementById('title');
let urlSearch = document.getElementById('urlTitle');
let citySearch = document.getElementById('city');
let companySearch = document.getElementById('company');
let descriptionSearch = document.getElementById('description');
let createBtn = document.getElementById('submitBtn');
//---------------------------------------------
let idUpdate = document.getElementById('idUpdate')
let jobUpdate = document.getElementById('jobUpdate');
let titleUpdate = document.getElementById('titleUpdate');
let urlUpdate = document.getElementById('urlTitleUpdate');
let cityUpdate = document.getElementById('cityUpdate');
let companyUpdate = document.getElementById('companyUpdate');
let descriptionUpdate = document.getElementById('descriptionUpdate');
let updateBtn = document.getElementById('submitUpdate');

let adsList = document.getElementById('adsList');

document.getElementById('adCreate').addEventListener('submit',(event)=>{
    event.preventDefault();
    async function apiCreate(){
        await fetch(`api/ads/create`)
        .then(response=>response.json())
        .then(data=>{
            displayAdminList();
        })
    }
})

document.getElementById('adUpdate').addEventListener('submit',(event)=>{
    event.preventDefault();
    async function apiUpdate(){
        await fetch(`api/ads/update?id=${idUpdate.value}&job=${jobSearch.value}&title=${titleSearch.value}&url=${urlSearch.value}&city=${citySearch.value}&company=${companySearch.value}&description=${descriptionSearch}`)
        .then(response=>response.json())
        .then(data=>{
            displayAdminList();
        })
    }
})

async function displayAdminList(){
    console.log("todo ok")
    
    await fetch('api/ads?admin')
    .then(response=>response.json())
    .then(data=>{
        for(i=0;i<data.length;i++){
            let createElement = document.createElement('li');
            adsList.appendChild(createElement);
            createElement = `
            <h2>${data[i].title}</h2>
            <p>${data[i].city}</p>
            <p>${data[i].date}</p>
            <p>${data[i].company}</p>
            <a onclick="${deleteAd}">Borrar</a>
            `
        }
    })
}

displayAdminList();

async function deleteAd(){

}

