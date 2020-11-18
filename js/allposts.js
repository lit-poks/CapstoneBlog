
'use strict';

let arr=["bart.png","homer.jpg","lisa.png","marge.jpg"];
const e = React.createElement;
let x=0;
function loadImage(){
    let loca="./img/"+arr[x];
    if(x==3){
        x=0
    }else{
        x=x+1;
    }
    return loca;
    
}

class Allposts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            erro: false
        }
        //this.returnResults = this.returnResults.bind(this);
    }


    handleClick=(id,title,body,author,likes)=>{
        sessionStorage.pid=id;
        sessionStorage.title=title;
        sessionStorage.body=body;
        sessionStorage.author=author;
        sessionStorage.likes=likes;
        window.location.replace("../mainpost.html")
    }
    fireEvent=()=>{
        return loadImage();
    }
    
    componentDidMount(){
        let auth;
        let acc;
        if (localStorage.rememberMe === "true") {
            auth = localStorage.accesstoken;
            acc = localStorage.uname;
        }
        else {
            auth = sessionStorage.accesstoken;
            acc = sessionStorage.uname;
        }
        let url = "http://localhost:8080/api/post/post/all";
        (async () => {
            let err=false;
            let posts = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth
                }
            });
            if(posts.ok){
            err=false;
            }
            else {err=true;}
            let ar=await posts.json();
            this.setState({
                data: ar
            });
            
        })();
    }
    
    render() {
        const postlist = this.state.data.map((p) => {
            let g=this.fireEvent();
            return (
                <div className="row row-content" key={p.id} onClick={()=>{this.handleClick(p.id,p.title,p.body,p.author,p.likes)}}>
                    <div className="fixedsize w-100 myBox shadow-lg">
                        <div className="h-100 imageBox">
                            <img src={g} alt="bart" className="h-100" style={{objectFit:"cover"}} />
                            <p>Author: {p.author}</p>
                        </div>
                        <div className="contentBox h-100" id="try">
                            <h2>{p.title}</h2>
                            <p>
                                {p.body}
                            </p>
                        </div>
                    </div>
                </div>
            );
            
        });
        return(
            <div className="container">
                {postlist}
            </div>
        )

    }
}

const domContainer = document.querySelector('#allposts_component');
ReactDOM.render(<Allposts/>, domContainer);


