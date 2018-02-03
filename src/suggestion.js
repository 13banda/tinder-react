import React from 'react';
import ReactDOM from 'react-dom';
import {Match} from './match';
import {EditProfile} from './home'

//import likeUserIcon from './../tinder images/if_like_1645993.svg'
//import LikeIcon from    './../tinder images/like.svg'
import styled from 'styled-components'
// loading icons
const NopeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/c86afa4e-f159-4c48-8b20-daba279c74ea";
const LikeIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/4cba9c50-9f3b-40c0-ac4c-cb96d3c32341";
const tinderUrl   = "https://filestore.embroidery86.hasura-app.io/v1/file/ece05495-414b-42f1-80a1-ad78baef0451"
const likeUserIcon = "https://filestore.embroidery86.hasura-app.io/v1/file/35884cb3-37a4-49a4-a160-9b91e0de7c38"

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
    this.handlematch = this.handlematch.bind(this);
    this.state ={};
    this.handleProfile = this.handleProfile.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
 handleNext(){
   // here we can use state but i want to play with some loopi loopi .
   /*this.setState = {

   } */
   const next = this.props.current < (this.props.all.length-1) ? this.props.current + 1 : 0;

   const all = this.props.all;
     ReactDOM.render(
       <Suggest current={next} all={this.props.all}  H_id={all[next].hasura_id} name={all[next].name} id={all[next].profile_file_id} />,
       document.getElementById('desktop')
     );
 }
  // handle the setting button
 handleNope(){
    //delete the match user user from this
        var url = "https://data.embroidery86.hasura-app.io/v1/query";
        // cId mean current user hasura_id ok dev.
        var cId = window.localStorage.getItem('C_ID').toString();
        const H = this.props.H_id.toString();
       const query = "delete  from match where hasura_id = "+cId+" AND like_user_id = "+H+";"
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
      	console.log(result);
      })
      .catch(function(error) {
      	console.log('Request Failed:' + error);
      });
      this.handleNext();
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
                "like_user_id": H,
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
    this.handleNext();
 }
 handleProfile(){
   // see the suggest user profile
   const cId = window.localStorage.getItem('C_ID');
    let all = this.props.all;
    let d;
    for(let i= 0; i<all.length;i++){
      if(all[i].hasura_id==cId)
      {
        d = all[i];
      }
    }
   ReactDOM.render(<EditProfile current={this.props.current} userInfo={d} sugest={this.props.all}/>,document.getElementById('desktop'))
 }
 handlematch(){
   // show match case
   ReactDOM.render(<Match current={this.props.current} all={this.props.all} H_id={this.props.H_id} name={this.props.name} id={this.props.id}/>,document.getElementById('desktop'))
 }
 //            <img style={{borderRadius: "50%",margin:" 10 0 0 10", border:" 2px solid #fff",width:45,height:" 40px"}} src={url} onClick={this.handleProfile}/>
render(){
  let url = "https://filestore.embroidery86.hasura-app.io/v1/file/"+this.props.id;
   const cId = window.localStorage.getItem('C_ID');
    let all = this.props.all;
    let d;
    for(let i= 0; i<all.length;i++){
      if(all[i].hasura_id==cId)
      {
        d = all[i].profile_file_id;
      }
    }
    let cUrl= "https://filestore.embroidery86.hasura-app.io/v1/file/"+d;
    return(
      <CenterPannel>
        <Pannel_1>
          <Head>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={{display:"flex",justifyContent:"center",marginRight: -10}}>
                <img onClick={this.handleProfile} style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={cUrl} />
              </div>
              <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                <img  style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={tinderUrl} />
              </div>
              <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                <img onClick={this.handlematch} style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={likeUserIcon} />
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
