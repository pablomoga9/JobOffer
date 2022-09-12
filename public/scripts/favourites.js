let favsList = document.getElementById('favsList');

//GET fav ads
const showFavAds = async()=>{
    // await fetch(`api/signup?email=${email}&password=${password}&full_name=${full_name}`,{
    try{
        await fetch('api/favourites',{
            method:'GET',
            body:JSON.stringify(),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            const liContent = data.map((element)=>{
                return `
                <li class="listElements">
                <a href="${element[0].titleUrl}" class="elementUrl"><h2 class="elementTitle">${element[0].title}</h2></a>
                <p>${element[0].city}</p>
                <p>${element[0].date}</p>
                <p>${element[0].description}</p>
                <p>${element[0].company}</p>
                </li>
                `
            })
            .join('')
            favsList.innerHTML = liContent;
        })
        // const data = await response.json();
        // console.log(data);
        // return data;

     } catch (error){
      console.log("Favoritos no encontrados",error);
     }}


    showFavAds()  
    
    

    



async function deleteFav(ad) {
    
    try {
      let response = await fetch('/favourites?ad='+ad,{
          method:'DELETE',
          headers:{
              'Content-Type': 'application/json'
          }
      })
      let answer = await response.json(); // objeto de vuelta de la petición
      return answer
    } catch (error){
      console.log(error);
    }
  }
  const deleteButtons = document.querySelectorAll(".DeleteButton");
  for (let index = 0; index < deleteButtons.length; index++) {
      deleteButtons[index].addEventListener('click',function(event){
          event.preventDefault()
          let adId = event.target.getAttribute("adId")
          deleteFav(adId);
          location.reload()
      })
      
  }
