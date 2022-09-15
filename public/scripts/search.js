


let searchInput = document.getElementById('search');
let cityInput = document.getElementById('city');
let submitBtn = document.getElementById('submitBtn')
let searchList = document.getElementById('searchList');
let searchForm=document.getElementById('searchForm');
let logoutBtn = document.getElementById('logout');
let spinner = document.getElementById('modal4')
let favButtons;
const pdfBtn = document.getElementById('pdfBtn');

 searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    searchList.innerHTML = "";
    async function callApi(searchJob,searchCity){
        spinner.showModal()
        await fetch(`api/search?job=${searchJob}&city=${searchCity}`)
        .then(response=>response.json())
        .then(data=>{
           
            const liContent = data.map((element)=>{
                return `
                <li class="listElements">
                <a href="${element.titleUrl}" class="elementUrl"><h2 class="elementTitle">${element.title}</h2></a>
                <p id="company">${element.company}</p>
                <p id="description">${element.description}</p>
                <p id="cities">${element.city}</p>
                <p id="date">${element.date}</p>  
                <button class="favBtn">❤</button>
                </li>
                `
            })
            .join('')
            searchList.innerHTML = liContent;
            favButtons = document.querySelectorAll('.favBtn');
            spinner.close()

            for(i=0;i<favButtons.length;i++){
                
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
   try{ 
   
    const getId = await fetch(`api/search?title=${title}`)
   .then(response=>response.json())
   .then(data=>{
        
        ad = {id: data[0]._id};
     
   })
   
   
    const addFav = await fetch('api/favourites',{
        method:'POST',
        body: JSON.stringify(ad),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response=>response.json())
    .then(data=>{
        
        // insertFavsList();
        
    })}catch(error){
        console.log(error);
    } 
}saveFav()


// async function insertFavsList(){
    
//     let favsList=document.getElementById('favsList').innerHTML = "";
    
//     await fetch('/favourites')
//     .then(response=>response.json())
//     .then(data=>{
       
//         for(i=0;i<data.length;i++){
//             let createElement = document.createElement('li');
//             favsList.appendChild(createElement);
//             createElement.innerHTML = `
//             <h2>${data[i].id}</h2>
//             <p>${data[i].user_id}</p>
//             <p>${data[i].ad}</p>
//             <button>Borrar</button>
//             `
//         }

        
//     })
// }


logoutBtn.addEventListener('click',async (event)=>{
    event.preventDefault();
    try{
       
        await fetch(`/api/logout`);
    }
    catch(error){

    }
})

 document.getElementById('pdfForm').addEventListener('submit',(event)=>{
        event.preventDefault();
       
        async function downloadPdf(){
            try{
               
                await fetch('api/search?pdf=true')
              }
            catch(error){
                console.log(error.message);
            }
        }
        downloadPdf();
    })





  

