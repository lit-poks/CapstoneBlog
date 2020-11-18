
'use strict';


const e = React.createElement;

class Myposts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            erro: false
        }
        this.returnResults = this.returnResults.bind(this);
    }

    handleClick=(id,title,body,author,likes)=>{
        sessionStorage.pid=id;
        sessionStorage.title=title;
        sessionStorage.body=body;
        sessionStorage.author=author;
        sessionStorage.likes=likes;
        window.location.replace("../mainpost.html")
    }

    returnResults() {
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
        let url = "http://localhost:8080/api/post/post/all/" + acc;
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

        const postlist = this.state.data.map((p) => {
            return (
                <div className="row row-content" key={p.id} onClick={()=>{this.handleClick(p.id,p.title,p.body,p.author,p.likes)}}>
                    <div className="fixedsize w-100 myBox shadow-lg">
                        <div className="h-100 imageBox">
                            <img src="./img/bart.png" alt="bart" className="h-100" style={{objectFit:"cover"}} />
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

        return (
            <div className="container">
                {postlist}
            </div>
        )


    }

    render() {
        return(
            <div>
                {this.returnResults()}
            </div>
        )

    }
}

const domContainer = document.querySelector('#myposts_component');
ReactDOM.render(<Myposts/>, domContainer);


