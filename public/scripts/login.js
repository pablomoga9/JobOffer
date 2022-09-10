const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");

document.getElementById("form1").addEventListener("submit",(event)=>{
    event.preventDefault();
    const loginData = {
        email: emailInput.value,
        pass: passInput.value
    }
    const postCredentials = async (email) =>{
        await fetch('api/login?email='+email,{
            method:'POST',
            body: JSON.stringify(loginData),
            headers:{
                'Content-Type': 'application/json'
              }
        })
    }
    postCredentials();
})