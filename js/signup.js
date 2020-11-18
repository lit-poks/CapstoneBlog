
document.getElementById("signUpForm").addEventListener('submit',signup);

function signup(){
    event.preventDefault();
    $(document).ready(function(){
        let data={};
    data.firstName=document.getElementById('fname').value;
    data.lastName=document.getElementById('lname').value;
    data.userName=document.getElementById('uname').value;
    data.emailAddress=document.getElementById('email').value;
    data.password=document.getElementById('pass').value;
    data.country=document.getElementById('country').value;
    data.contactNumber=document.getElementById('number').value.toString();
    console.log(JSON.stringify(data));
    
    (async ()=>{
        let url="http://localhost:8080/api/user/user/signup"+"?"+$.param(data);
        let signingup=await fetch(url,{
            method: 'POST',
            headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'Content-Type': 'application/json;charset=UTF-8'
                },
        });

        let response=await signingup.json();
        if(signingup.ok){
            alert("Account Created, please login to Begin");
            window.location.replace("../index.html");
        }
        else{
            if(response.code=="SGR-002"||response.code=="SGR-001"){
                alert(response.message);
            }
            
        }
    })()


    });
}