'use strict';

const e = React.createElement;

class RenderComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tags: null
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(commentId){
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
        let url="http://localhost:8080/api/comment/comment/delete/"+commentId;
        (async ()=>{
            let del=await fetch(url,{
                method: "DELETE",
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth
                }
            });

            let delRes=await del.json();
            if(del.ok){
                alert("Comment Succesfully deleted");
                window.location.reload();
            }
            else{
                alert(delRes.message);
            }
        })();
    }

    componentDidMount() {
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

        let url = "http://localhost:8080/api/comment/comment/all/" + sessionStorage.pid;
        (async () => {
            let comm = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    'authorization': auth
                }
            });

            let commjs = await comm.json();
            this.setState({
                data: commjs
            });
        })();

    }

    render() {
        const commlist = this.state.data.map((p) => {
            console.log("here");
            return (
                <div className="row bg-dark p-2 m-2 text-white" key={p.id}>
                    <span className="fa fa-user"></span><div className="col">{p.commentContent}</div>
                    <div>By {p.author}</div>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>this.handleClick(p.id)}><span className="fa fa-trash"></span></button>
                </div>
            );
        });

        return (
            <div className="row ">
                <h3 className="mt-5">All Comments</h3>
                <div className="w-100 bg-primary" id="commentContainer">
                    {commlist}
                </div>
            </div>
        )

    }
}

const domContainer = document.querySelector('#comment_component');
ReactDOM.render(<RenderComments />, domContainer);
