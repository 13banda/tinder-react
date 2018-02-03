import React from 'react';
import ReactDOM from 'react-dom';
//import Back from './../tinder images/left-angle-bracket.svg'
//import LikeIcon from './../tinder images/like.svg'
import styled from 'styled-components'
import {suggestU, Suggest} from "./suggestion"

// loading icons
const NopeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/c86afa4e-f159-4c48-8b20-daba279c74ea";
const LikeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/4cba9c50-9f3b-40c0-ac4c-cb96d3c32341";
const tinderUrl   = "https://filestore.embroidery86.hasura-app.io/v1/file/ece05495-414b-42f1-80a1-ad78baef0451"
const Back = "https://filestore.embroidery86.hasura-app.io/v1/file/fec4aa52-bcf4-4ffa-ae45-2b52625b4ea0"
const CenterPannel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Pannel_1 = styled.div`
  background: #fff;
  border: 1px solid #0003;
  border-radius: 18px;
  height: 600px;
  width: 375px;
  margin-top: 90px;
  display: grid;
  grid-template-rows: 0.1fr 1fr;
  grid-template-columns: 1fr;
  overflow: scroll;
`;
const IconCon = styled.div`
  height: 35px;
  width: 35px;
  padding: 7px;
  color: red;
`;
const Head = styled.div`
grid-row-start: 1;
grid-row-end: 2;
    box-shadow: 0 0 4px #0000002e;
`;
const Middle = styled.div`
 padding: 0 1px;
 overflow: hidden;
`;
const Bottom = styled.div`
`;
const Matches = styled.div`
 width: 100%;
 height: 100%;
 background: #fff;
 display: grid;
 grid-template-columns: 1fr;
 grid-template-rows: repeat(3, 69px);
 grid-gap: 0px;
 margin-top: 10px;
 grid-auto-rows: 69px;
 justify-items: center;
 justify-content: center;
 align-items: stretch;
 overflow: scroll;
`;
const Row = styled.div`
 width: 100%;
 height: 100%;
 background: #fff;
 display: grid;
 grid-template-columns: 2.2fr 4fr;
`;
 const Ava = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
 `;

// makeing list item custom
class Item extends React.Component {
   constructor(props) {
      super(props);
     this.handleItmes = this.handleItmes.bind(this);
    }
    handleItmes(){
      ReactDOM.render(<Suggest name={this.props.name} id={this.props.pic} />,document.getElementById('desktop'))
    }
     render(){
       let picUrl  = "https://filestore.embroidery86.hasura-app.io/v1/file/"+this.props.pic;
       return (
         <Row onClick={this.handleItmes}>
           <div onClick={this.handleItmes} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <Ava src={picUrl}></Ava>
           </div>
           <div style={{ fontSize: 18 ,display: "flex", justifyContent:"start",alignItems: "center",borderBottom: "1px solid rgba(206, 193, 193, 0.53)"}}><p>{this.props.name}</p></div>
         </Row>
     )
   }
 }

export class Match extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
// handle the setting putton
 handleClick(){
// nothing work here but update the current suggestion
ReactDOM.render(<Suggest current={this.props.current} all={this.props.all} H_id={this.props.H_id} name={this.props.name} id={this.props.id} />,document.getElementById('desktop'))
// ReactDOM.render(<LogoutPage />,document.getElementById('desktop'))
 }
 //<img style={{borderRadius: "50%",margin:" 10 0 0 10", border:" 2px solid #fff",width:45,height:" 40px"}} src={url} onClick={this.handleProfile}/>
render(){
  //const listItems = allUser.map(allUsers => allUsers.hasura_id!==currentUser_id && <Item  name={allUsers.name} pic={allUsers.profile_file_id} />);
  //let url = "https://filestore.embroidery86.hasura-app.io/v1/file/"+this.props.id;
   match();
    return(
      <CenterPannel>
        <Pannel_1>
          <Head>
            <div style={{display:"grid", gridTemplateColumns:"0.7fr 1fr"}}>
               <div style={{display:"flex",justifyContent:"start",marginRight: -10}}>
                 <img onClick={this.handleClick} style={{borderRadius: "100%", border:" 2px solid #fff",width: "72px",height:" 26px", marginTop: 21}} src={Back} />
               </div>
               <div  style={{display:"flex",justifyContent:"start",marginRight: 30}}>
                <img  style={{borderRadius: "100%", border:" 2px solid #fff",width: "66px",height:" 47px", marginTop: 14}} src={tinderUrl} />
              </div>
           </div>
          </Head>
          <Middle>
            <Matches id="match">
            </Matches>
          </Middle>
        </Pannel_1>
      </CenterPannel>
    );
  }
}
export function match(){

              var url = "https://data.embroidery86.hasura-app.io/v1/query";
              let listItems;
                  // If you have the auth token saved in offline storage
                  // var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
                  // headers = { "Authorization" : "Bearer " + authToken }
                    var id =  window.localStorage.getItem('C_ID');
                    var query = "select match.like_user_id, userinfo.name,userinfo.profile_file_id from match,userinfo where match.like_user_id = userinfo.hasura_id AND match.hasura_id ="+id;
                  var requestOptions = {
                "method": "POST",
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer 63bcb0e4a6a53ea0682e06f81f601ea855ab52abaa644551"
                }
                };

                var body = {
                "type": "run_sql",
                "args": {
                  "sql": query
                }
                };

                requestOptions.body = JSON.stringify(body);

                fetch(url, requestOptions)
                .then(function(response) {
                return response.json();
                })
                .then(function(result) {
                    listItems = result['result'].slice(1,result['result'].length).map(a => <Item id={a[0]} name={a[1]} pic={a[2]} />);
                     ReactDOM.render(listItems,document.getElementById('match'))
                })
                .catch(function(error) {
                console.log('Request Failed:' + error);
                });

}
function updateSuggestion(){
  // get 10 user hasura-id
}
