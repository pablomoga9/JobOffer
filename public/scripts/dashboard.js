let jobCreate = document.getElementById('job');
let titleCreate = document.getElementById('title');
let urlCreate = document.getElementById('urlTitle');
let cityCreate = document.getElementById('city');
let companyCreate = document.getElementById('company');
let descriptionCreate = document.getElementById('description');

//---------------------------------------------
let idUpdate = document.getElementById('idUpdate')
let jobUpdate = document.getElementById('jobUpdate');
let titleUpdate = document.getElementById('titleUpdate');
let urlUpdate = document.getElementById('urlTitleUpdate');
let cityUpdate = document.getElementById('cityUpdate');
let companyUpdate = document.getElementById('companyUpdate');
let descriptionUpdate = document.getElementById('descriptionUpdate');


let adsList = document.getElementById('adsList');

document.getElementById('adCreate').addEventListener('submit',(event)=>{
    event.preventDefault();
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let createData = {
        search:jobCreate.value,
        title: titleCreate.value,
        titleUrl: urlCreate.value,
        city:cityCreate.value,
        date:`Creado: ${day}/${month}/${year}`,
        company:companyCreate.value,
        description: descriptionCreate.value,
        adminAd: true
    }
    async function apiCreate(){
       
       try{
            await fetch('api/ads/create',{
                method:'POST',
                body: JSON.stringify(createData),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
            .then(response=>response.json())
            .then(data=>{
                displayAdminList();
            })
       }
       catch(error){
        console.log(error.message);
       }
    }
    apiCreate();
})

document.getElementById('adUpdate').addEventListener('submit',(event)=>{
    event.preventDefault();
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let updateData = {
        _id:idUpdate.value,
        search:jobUpdate.value,
        title: titleUpdate.value,
        titleUrl: urlUpdate.value,
        city:cityUpdate.value,
        date:`Updated: ${day}/${month}/${year}`,
        company:companyUpdate.value,
        description: descriptionUpdate.value,
        adminAd: true
    }
    async function apiUpdate(){
       try{
        await fetch(`api/ads/update`,{
            method:'PUT',
            body: JSON.stringify(updateData),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        .then(response=>response.json())
        .then(data=>{
            displayAdminList();
        })
       }
       catch(error){
        console.log(error.message)
       }
    }
    apiUpdate();
})



async function displayAdminList(){
    
    adsList.innerHTML = "";
    await fetch('api/search?admin=true')
    .then(response=>response.json())
    .then(data=>{
       
        for(i=0;i<data.length;i++){
            let createElement = document.createElement('li');
            adsList.appendChild(createElement);
            createElement.innerHTML = `
            <h2>${data[i].title}</h2>
            <p>${data[i].city}</p>
            <p>${data[i].date}</p>
            <p>${data[i].company}</p>
            <button>Borrar</button>
            `
            // <button onclick="${deleteAd(data[i]._id)}" action="api/ads/delete?email" method="DELETE">Borrar</button>
        }
    })
}

displayAdminList();




// async function deleteAd(elementId){
//     console.log("inin");
//     try{
//         // await fetch('api/ads/delete',{
//         //     method:'PUT',
//         //     body: JSON.stringify(deleteData),
//         //     headers:{
//         //         'Content-Type': 'application/json'
//         //       }
//         // })
//         await fetch(`api/ads/delete?id=${elementId}`,{
//             method:'DELETE'
//         })
//         .then(response=>response.json())
//         .then(data=>{
//             displayAdminList();
//         })
//     }
//     catch{

//     }
// }



    async function downloadPdf(){
        try{
            console.log("in")
            await fetch('api/search?pdf=true')
            .then(response=>response.json())
            .then(data=>{
                console.log("done");
            })
        }
        catch(error){
            console.log(error.message);
        }
    }
   


