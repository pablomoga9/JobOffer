const emailInput = document.getElementById("email2");
const nameInput = document.getElementById("nameInput");
const passInput = document.getElementById("pass1");
const passInput2 = document.getElementById("pass2");

document.getElementById("form2").addEventListener("submit",(event)=>{
    event.preventDefault();
    const registerData = {
        email: emailInput.value,
        name: nameInput.value,
        pass: passInput.value,
        passRepeat: passInput2.value
    }

    const sendRegister = async()=>{
        try{
            await fetch('api/register',{
                method:'POST',
                body: JSON.stringify(registerData),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
        }
        catch(error){
            console.log(error.message);
        }
    }
    sendRegister();
})