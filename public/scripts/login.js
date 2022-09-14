const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");

document.getElementById("form1").addEventListener("submit",(event)=>{
    event.preventDefault();
    const loginData = {
        email: emailInput.value,
        pass: passInput.value
    }
    const postCredentials = async (email) =>{
        try{
            const doFetch = await fetch('api/login?email='+email,{
                method:'POST',
                body: JSON.stringify(loginData),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
            //  await emailInput.value == "";
            // await passInput.value==""
            // .then(response=>response.json())
            // .then(data=>{
            //     console.log(data);
            //     emailInput.value = ""
            //     passInput.value=""
            //     emailInput.style.background="green"
            //     passInput.style.background="green"
            // })
            
        }
        catch(error){
            console.log("error");
            // emailInput.style.background="red"
            // passInput.style.background="red"
        }
        
    }
    postCredentials();
})