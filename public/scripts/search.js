


let searchInput = document.getElementById('search');
let cityInput = document.getElementById('city');
let submitBtn = document.getElementById('submitBtn')
let searchList = document.getElementById('searchList');
let searchForm=document.getElementById('searchForm');


let favButtons;


 searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    searchList.innerHTML = "";
    async function callApi(searchJob,searchCity){
        
        await fetch(`api/search?job=${searchJob}&city=${searchCity}`)
        .then(response=>response.json())
        .then(data=>{
           
            const liContent = data.map((element)=>{
                return `
                <li class="listElements">
                <a href="${element.titleUrl}"><h2 class="elementTitle">${element.title}</h2></a>
                <p>${element.city}</p>
                <p>${element.date}</p>
                <p>${element.description}</p>
                <p>${element.company}</p>
                <button class="favBtn">❤</button>
                </li>
                `
            })
            .join('')
            searchList.innerHTML = liContent;
            favButtons = document.querySelectorAll('.favBtn');


            for(i=0;i<favButtons.length;i++){
                console.log(favButtons[i]);
                favButtons[i].addEventListener('click',function(event){
                    let title = event.target.parentNode.children[0].children[0].innerHTML;
                    saveFav(title);
                    })
            }
        })
    }
    callApi(searchInput.value,cityInput.value);
} )



async function saveFav(title){
   let ad;
   try{ const getId = await fetch(`api/search?title=${title}`)
   .then(response=>response.json())
   .then(data=>{
        ad = {id: data[0]._id};
     
   })
   console.log(ad);
    const addFav = await fetch('api/favourites',{
        method:'POST',
        body: JSON.stringify(ad),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response=>response.json())
    .then(data=>{
        insertFavsList();
    })}catch(error){
        console.log(error);
    } 
}saveFav()


async function insertFavsList(){
    
    let favsList=document.getElementById('favsList').innerHTML = "";
    await fetch('/favourites')
    .then(response=>response.json())
    .then(data=>{
       
        for(i=0;i<data.length;i++){
            let createElement = document.createElement('li');
            favsList.appendChild(createElement);
            createElement.innerHTML = `
            <h2>${data[i].id}</h2>
            <p>${data[i].user_id}</p>
            <p>${data[i].ad}</p>
            <button>Borrar</button>
            `
        }
    })
}





  

