


let searchInput = document.getElementById('search');
let cityInput = document.getElementById('city');
let submitBtn = document.getElementById('submitBtn')
let searchList = document.getElementById('searchList');


let favButtons;


document.getElementById('searchForm').addEventListener('submit',(event)=>{
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



const saveFav = async(title)=>{
   let ad;
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
    })
}






  

