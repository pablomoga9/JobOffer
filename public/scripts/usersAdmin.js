require('')

//POST
let idPost = document.getElementById('id');
let emailPost=document.getElementById('email');
let passwordPost = document.getElementById('password');
let namePost = document.getElementById('fullName');
let rolePost = document.getElementById('role');

let usersList = document.getElementById('usersList');

//PUT
let idPut = document.getElementById('id2');
let emailPut = document.getElementById('2email');
let passwordPut = document.getElementById('password2');
let namePut = document.getElementById('fullName2');
let rolePut = document.getElementById('role2');

//DELETE
let deleteBtn=document.getElementById('DeleteBtn');

//Listener para el post
document.getElementById('userCreate').addEventListener('submit',(event)=>{
    event.preventDefault();
    let createUser = {
        id:idPost.value,
        email: emailPost.value,
        password: passwordPost.value,
        full_name:namePost.value,
        role:rolePost.value
    }
    
    async function userCreate(){
        
        try{
            await fetch('/users',{
                method:'POST',
                body: JSON.stringify(createUser),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response=>response.json())
            .then(data=>{
                insertUsersList();
            })
        }
        catch(error){
            console.log(error);
        }
    }
    userCreate();
})

//Listener para el put
document.getElementById('userUpdate').addEventListener('submit',(event)=>{
    event.preventDefault();
    let updateUser = {
        id:idPut.value,
        email: emailPut.value,
        password: passwordPut.value,
        full_name:namePut.value,
        role:rolePut.value
    }

    async function userUpdate(){
       try{
        await fetch(`/users`,{
            method:'PUT',
            body: JSON.stringify(updateUser),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        .then(response=>response.json())
        .then(data=>{
            insertUsersList();
        })
       }
       catch(error){

       }
    }
    userUpdate();
})

async function insertUsersList(){
    
    usersList.innerHTML = "";
    await fetch('/users')
    .then(response=>response.json())
    .then(data=>{
       
        for(i=0;i<data.length;i++){
            let createElement = document.createElement('li');
            adsList.appendChild(createElement);
            createElement.innerHTML = `
            <h2>${data[i].id}</h2>
            <p>${data[i].email}</p>
            <p>${data[i].password}</p>
            <p>${data[i].full_name}</p>
            <p>${data[i].role}</p>
            <button>Borrar</button>
            `
            // <button onclick="${deleteAd(data[i]._id)}">Borrar</button>
        }
    })
}


async function deleteUser(emailDelete) {
  try {
    let response = await fetch('/users?email='+emailDelete,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    let answer = await response.json(); // objeto de vuelta de la petición
        return answer
    //   .then((response) => response.json())
    //   .then((data) => {
    //     insertUsersList();
    //   });
  } catch (error){
    console.log(error);
  }
}

deleteBtn.addEventListener('click',(event)=>{
  
})


insertUsersList();
