let resetInput = document.getElementById('resetPassword');
let resetInput2 = document.getElementById('resetPassword2');


document.getElementById('resetForm').addEventListener('submit',(event)=>{
    event.preventDefault();
    const resetPassword = async(password,password2)=>{
        const url = window.location.href;
        const divideUrl = url.split("=");
        const token = divideUrl[1];
        
        await fetch(`api/resetPassword/${token}`,{
            method:'PUT',
            body: JSON.stringify({password:resetInput}),
            headers:{
                'Content-Type': 'application/json'
              }
        })
    }
    resetPassword();
})