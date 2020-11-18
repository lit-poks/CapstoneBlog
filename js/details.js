(async ()=>{
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
            document.getElementById("fname").value=details.first_name;
            document.getElementById("lname").value=details.last_name;
            document.getElementById("urname").value=details.user_name;            
            document.getElementById("email").value=details.email_address;
            document.getElementById("country").value=details.country;
            document.getElementById("number").value=details.contact_number;
        }
        else{
            alert("You are not signed In");
            window.location.replace("../index.html");
        }
    }
})()