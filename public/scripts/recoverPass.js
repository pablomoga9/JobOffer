let recoverInput = document.getElementById('emailInput');





document.getElementById('form5').addEventListener('submit',(event)=>{
    event.preventDefault();
    const sendEmail = async(email)=>{
        try{    
            await fetch(`/api/recoverPassword/:${email}`);
        }
        catch(error){
            console.log(error);
        }
    }
    sendEmail(recoverInput.value)
})




