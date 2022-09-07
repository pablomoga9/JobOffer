

let searchInput = document.getElementById('search');
let cityInput = document.getElementById('city');
let submitBtn = document.getElementById('submitBtn')
let searchList = document.getElementById('searchList');

document.getElementById('searchForm').addEventListener('submit',(event)=>{
    event.preventDefault();
    searchList.innerHTML = "";
    async function callApi(searchJob,searchCity){
        
        await fetch(`api/search?job=${searchJob}&city=${searchCity}`)
        .then(response=>response.json())
        .then(data=>{
           
            for(i = 0; i < data.length; i++){
                let createElement = document.createElement('li');
                searchList.appendChild(createElement);
                createElement.innerHTML = `
                <a href="${data[i].titleUrl}"><h2>${data[i].title}</h2></a>
                <p>${data[i].city}</p>
                <p>${data[i].date}</p>
                <p>${data[i].company}</p>
                `
            }
        })
    }
    callApi(searchInput.value,cityInput.value);
} )


