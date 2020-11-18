async function navbar(){
    let auth;
    let acc;
    if(localStorage.rememberMe==="true"){
        auth=localStorage.accesstoken;
        acc=localStorage.uname;
    }
    else{
        auth=sessionStorage.accesstoken;
        acc=sessionStorage.uname;

    }
    if(localStorage.getItem('access-token')!=""){

        let url="http://localhost:8080/api/user/user/"+acc;
        let checkInfo=await fetch(url,{
            method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth,
                }
        });
        
        let details=await checkInfo.json();
        if(checkInfo.ok){
            let name=details.first_name;
            document.getElementById("dropdownName").innerHTML=name;
        }
        else{
            alert("You are not signed In");
            window.location.replace("../index.html");
        }
    }
}

navbar();

document.getElementById("logout").addEventListener('click',logout);

function logout(){
    console.log("top");
    let auth;
    if(localStorage.rememberMe=="true"){
        auth=localStorage.accesstoken;
    }
    else{
        auth=sessionStorage.accesstoken;
    }
    async function log(){
        let response=await fetch("http://localhost:8080/api/user/user/signout",{
            method: 'POST',
            headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth,
            }
        });

        if(response.ok){
            console.log('here');
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("uname");
            sessionStorage.removeItem("accesstoken");
            sessionStorage.removeItem("uname");
            localStorage.removeItem("rememberMe");
            window.location.replace("../index.html");
        }
        else{
            alert("You are not signed In");
            window.location.replace("../index.html");
        }
    };
    log();
}