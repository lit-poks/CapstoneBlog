
var likecount=parseInt(sessionStorage.likes);
$(document).ready(function(){
    document.getElementById('blogTitle').innerHTML=sessionStorage.title;
    document.getElementById('blogBody').innerHTML=sessionStorage.body;
    document.getElementById("aut").innerHTML="By "+sessionStorage.author;

    if(likecount===0){
        document.getElementById("likeButton").innerHTML="<i class=\"fa fa-thumbs-up\"></i>Like";
        document.getElementById("likecount").innerHTML="Be the first one to like this!";
    }
    else{
       document.getElementById("likecount").innerHTML=likecount+" people have liked this!";
    }
    
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
        let url="http://localhost:8080/api/user/user/"+acc;
        let checkMatch=await fetch(url,{
            method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth,
                }
        });

        let check=await checkMatch.json();
        if(checkMatch.ok){
            if(check.user_name!=sessionStorage.author){
                $("#editButton").attr("hidden",true);
                $("#deleteButton").attr("hidden",true);
            }
        }
    })();
    
})


var editState="edit";

document.getElementById('editButton').addEventListener('click',function(){
    edit();
});

document.getElementById('likeButton').addEventListener('click',function(){
    liking();
});

document.getElementById('commentButton').addEventListener('click',function(){
    addComment();
});

document.getElementById("deleteButton").addEventListener('click',function(){
    deletePost();
});

function edit(){
    
    if(editState==="edit"){
        var ed=document.getElementById("editButton");
        ed.innerHTML="Save"+"<i class=\"fa fa-edit\"></i>";
        editState="Save";
        document.getElementById("blogTitle").style.border="1px solid red";
        document.getElementById("blogTitle").contentEditable= true;
        document.getElementById("blogBody").style.border="1px solid darkgray";
        document.getElementById("blogBody").contentEditable= true;
        
    }
    else{
        var ed=document.getElementById("editButton");
        ed.innerHTML="Edit"+"<i class=\"fa fa-edit\"></i>";
        editState="edit";
        document.getElementById("blogTitle").style.border="none";
        document.getElementById("blogTitle").contentEditable= false;
        document.getElementById("blogBody").style.border="none";
        document.getElementById("blogBody").contentEditable= false;
        editing('edit');
    }
}


var doneLiking=false;
function liking(){
    if(!doneLiking){
        doneLiking=true;
    if(likecount===0){
        document.getElementById("likeButton").innerHTML="<i class=\"fa fa-thumbs-up\"></i>Liked";
        document.getElementById("likecount").innerHTML="1 person likes this!";
        likecount++;
    }
    else{
        likecount++;
       document.getElementById("likecount").innerHTML=likecount+" people have liked this!";
        
    }
    editing('like');
}
else{
    likecount--;
    doneLiking=false;
    if(likecount==0){
        document.getElementById("likeButton").innerHTML="<i class=\"fa fa-thumbs-up\"></i>Like";
        document.getElementById("likecount").innerHTML="Be the first one to like this!!";
    }
    else{
       document.getElementById("likecount").innerHTML=likecount+" people have liked this!";
    }
    editing('like');
}
}


function addComment(){
    let data={};
    data.comment=document.getElementById("comments").value;
    console.log(data.comment);
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
        let url="http://localhost:8080/api/comment/comment/"+sessionStorage.pid+"/create?"+$.param(data);
        console.log(url);
        let createComment=await fetch(url,{
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                'authorization': auth,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });

        let commerr=await createComment.json();
        if(createComment.ok){
            alert("comment created");
            document.getElementById("comments").value="";
            window.location.reload();
        }
        else{
            alert(commerr.message);
        }
    })();
}

function editing(type){

    (async ()=>{
        datas={};
        datas.title=document.getElementById("blogTitle").innerHTML;
        datas.body=document.getElementById("blogBody").innerHTML;
        datas.likes=likecount.toString();
        console.log(datas.title);
        console.log(datas.body);
        console.log(datas.likes);

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
        
        let url="http://localhost:8080/api/post/post/edit/"+sessionStorage.pid+"?"+$.param(datas);
        let ePost=await fetch(url,{
            method: 'PUT',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                'authorization': auth,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
        let er=await ePost.json();
        if(ePost.ok){
            if(type=='edit'){
            alert("Successfully Edited");
            }
            else if(type=='like'){
                alert("likes changed");
            }
            sessionStorage.title=datas.title;
            sessionStorage.body=datas.body;
            sessionStorage.likecount=parseInt(datas.likes);
        }
        else{
            alert(er.message);
        }
        
    })();
}

function deletePost(){
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
        (async ()=>{
            let url="http://localhost:8080/api/post/post/delete/"+sessionStorage.pid;

            let del=await fetch(url,{
                method: 'DELETE',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth,
                }
            });

            let delresp=await del.json();
            if(del.ok){
                sessionStorage.removeItem("pid");
                alert("Post Deleted Successfully");
                window.location.replace("../home.html");
            }
            else{
                alert(delresp.message);
            }
        })();
}