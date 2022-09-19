const logoutBtn = document.getElementById("logout");
console.log("works")

logoutBtn.addEventListener('submit',(event)=>{
    event.preventDefault();
    const logoutUser = async()=>{
        await fetch('api/logout/')
    }
})