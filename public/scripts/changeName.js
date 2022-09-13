const nameInput = document.getElementById('newNameInput');

document.getElementById('updateName').addEventListener('submit',(event)=>{
    event.preventDefault();
    const updateName = async()=>{
        await fetch(`api/users/${nameInput.value}`,{
            method:"PUT",
            body: JSON.stringify(nameInput.value),
            headers:{
                'Content-Type': 'application/json'
              }
        })
    }
})