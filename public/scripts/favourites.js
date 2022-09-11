//GET fav ads
const showFavAds = async(email)=>{
    // await fetch(`api/signup?email=${email}&password=${password}&full_name=${full_name}`,{
    try{let response= await fetch(`api/favourites?email=`+email,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    let answer = await response.json({}); // objeto de vuelta de la petición
    return answer
  } catch (error){
    console.log("Favoritos no encontrados",error);
    
}}
showFavAds();


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
