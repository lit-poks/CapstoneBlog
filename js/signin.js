async function start(){
    if(localStorage.getItem('accesstoken')!=""){
        let acc=localStorage.getItem('uname');
        let url="http://localhost:8080/api/user/user/"+acc;
        let checkInfo=await fetch(url,{
            method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': localStorage.getItem('accesstoken'),
                }
        });
        console.log('here');
        if(checkInfo.ok){
            window.location.replace("../home.html");
        }
    }
}

start();


document.getElementById("signInForm").addEventListener("submit",signIn);
function signIn(){
    
    event.preventDefault();
    $(document).ready(function(){
        let uname=document.getElementById("uname").value;
        let password=document.getElementById("password").value;
        let encoded="Basic "+btoa(uname+":"+password);
        (async ()=>{
            let respo=await fetch("http://localhost:8080/api/user/user/signin",{
                method: 'POST',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': encoded,
                }
            });
            let gg=await respo.json();
            if(respo.ok){
                let access=respo.headers.get('access-token');
                console.log(access);
                console.log(gg.id);
                if(document.getElementById("rememberMe").checked){
                    localStorage.setItem('rememberMe',true);
                    localStorage.setItem('uname',gg.id);
                    localStorage.setItem('accesstoken',access);
                    window.location.replace("../home.html");
                }
                else{
                    localStorage.setItem('rememberMe',false);
                    sessionStorage.setItem('uname',gg.id);
                    sessionStorage.setItem('accesstoken',access);
                    window.location.replace("../home.html");
                }
            }
            else{
                alert("Incorrect username or password");
            }
        })()
      
    });
}
