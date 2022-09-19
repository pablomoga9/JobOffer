const nameInput = document.getElementById('newNameInput');
const profileTitle = document.getElementById('profileTitle');

document.getElementById('updateName').addEventListener('submit',(event)=>{
    event.preventDefault();
    const updateData = {
        newName: nameInput.value
    }
    const updateName = async()=>{
        await fetch(`api/users/updateName`,{
            method:"PUT",
            body: JSON.stringify(updateData),
            headers:{
                'Content-Type': 'application/json'
              }
        })
    }
    updateName();
    profileTitle.innerHTML =nameInput.value
    nameInput.value = "";
})