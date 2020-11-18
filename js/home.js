
document.getElementById("postSubmit").addEventListener('click',createPost);

function createPost(){
    console.log("here");
    event.preventDefault();
    let data={};
    let auth;
    let acc;
    data.title=document.getElementById("postTitle").value;
    data.body=document.getElementById("postBody").value;
    if(localStorage.rememberMe==="true"){
        auth=localStorage.accesstoken;
        acc=localStorage.uname;
    }
    else{
        auth=sessionStorage.accesstoken;
        acc=sessionStorage.uname;

    }

    (async ()=>{
        let url="http://localhost:8080/api/post/post/create?"+$.param(data);
        let created=await fetch(url,{
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                'Content-Type': 'application/json;charset=UTF-8',
                'authorization': auth
            }
        });

        if(created.ok){
            document.getElementById("postTitle").value="";
            document.getElementById("postBody").value="";
            $('#createModal').modal('hide');
            alert("Successfully Created");
        }
        else{
            alert(created.message);
        }
        
    })()
}