const emailInput = document.getElementById("email2");
const nameInput = document.getElementById("nameInput");
const passInput = document.getElementById("pass1");


document.getElementById("form2").addEventListener("submit",(event)=>{
    event.preventDefault();
    const registerData = {
        email: emailInput.value, // este nombre tiene que ser igual que en el pug y el admin(model),sino no tira
        full_name: nameInput.value,
        password: passInput.value,
    }

    const sendRegister = async()=>{
            // await fetch(`api/signup?email=${email}&password=${password}&full_name=${full_name}`,{
             await fetch('api/signup',{
                method:'POST',
                body: JSON.stringify(registerData),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
            
    }
    sendRegister();
})