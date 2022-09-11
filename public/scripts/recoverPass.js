let recoverInput = document.getElementById('emailInput');

const sendEmail = async(email)=>{
    try{    
        await fetch(`/api/recoverPassword/:${email}`);
    }
    catch(error){
        console.log(error);
    }
}

sendEmail(recoverInput.value)