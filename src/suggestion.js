import React from 'react';
import ReactDOM from 'react-dom';
import {Match} from './match'
//import NopeIcon from './../tinder images/nope.svg'
//import LikeIcon from './../tinder images/like.svg'
import styled from 'styled-components'
// loading icons
const NopeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/c86afa4e-f159-4c48-8b20-daba279c74ea";
const LikeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/4cba9c50-9f3b-40c0-ac4c-cb96d3c32341";
const tinderUrl   = "https://filestore.embroidery86.hasura-app.io/v1/file/ece05495-414b-42f1-80a1-ad78baef0451"

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
  grid-template-rows: 0.9fr 5fr 1fr;
  grid-template-columns: 1fr;
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
`;
const Middle = styled.div`
 padding: 0 1px;
 overflow: hidden;
`;
const Bottom = styled.div`

`;


export class Suggest extends React.Component{
  constructor(props){
    super(props);
    this.handleNope = this.handleNope.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }
// handle the setting putton
 handleNope(){

  // ReactDOM.render(<LogoutPage />,document.getElementById('desktop'))
 }
 handleLike(){
   // nothing work here but update the current suggestion
   // save the like use id on cureent user

   var cId = window.localStorage.getItem('C_ID').toString();
  // alert(this.props.H_id);
   const H = this.props.H_id.toString();
   var url = "https://data.embroidery86.hasura-app.io/v1/query";

    // If you have the auth token saved in offline storage
    // var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    // headers = { "Authorization" : "Bearer " + authToken }
    var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 63bcb0e4a6a53ea0682e06f81f601ea855ab52abaa644551"
    }
    };

    var body = {
    "type": "insert",
    "args": {
        "table": "match",
        "objects": [
            {
                "LikeUser_id": H,
                "hasura_id": cId
            }
        ]
    }
    };

    requestOptions.body = JSON.stringify(body);

    fetch(url, requestOptions)
    .then(function(response) {
    return response.json();
    })
    .then(function(result) {
    console.log(result);
    })
    .catch(function(error) {
    console.log('Request Failed:' + error);
    });
 }
 handleProfile(){
   // see the suggest user profile
   alert('pro')
 }
 handlematch(){
   // show match case
   ReactDOM.render(<Match />,document.getElementById('desktop'))

 }
 //            <img style={{borderRadius: "50%",margin:" 10 0 0 10", border:" 2px solid #fff",width:45,height:" 40px"}} src={url} onClick={this.handleProfile}/>
render(){
  let url = "https://filestore.embroidery86.hasura-app.io/v1/file/"+this.props.id;
    return(
      <CenterPannel>
        <Pannel_1>
          <Head>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={{display:"flex",justifyContent:"center",marginRight: -10}}>
                <img style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={url} />
              </div>
              <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                <img  style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={tinderUrl} />
              </div>
              <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                <img onClick={this.handlematch} style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={tinderUrl} />
              </div>
            </div>
          </Head>
          <Middle>
            <img style={{border:"1px solid #0000004d",width:"100%",height:"488px", borderRadius:"1px"}} src={url} />
            <p style={{zindex:"10",marginTop:-97 ,marginLeft: 16,color: "#c55151",fontWeight: "bold",fontSize: 20, color: "#fff"}}>{this.props.name} </p>
          </Middle>
            <Bottom>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <div style={{display:"flex",justifyContent:"center",marginRight: -10}}>
                  <img style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} onClick={this.handleNope} src={NopeIcon}  />
                </div>
                <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                  <img src={LikeIcon} onClick={this.handleLike} style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12 }}  />
              </div>
              </div>
           </Bottom>
        </Pannel_1>
      </CenterPannel>
    );
  }
}

export function suggestU(){
   ReactDOM.render(<Suggest />,document.getElementById('desktop'))
}
function updateSuggestion(){
  // get 10 user hasura-id

}
