import React from 'react';
import ReactDOM from 'react-dom';
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
  grid-template-rows: 0.1fr 1fr;
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
const Matches = styled.div`
 width: 100%;
 height: 100%;
 background: #fff;
 display: grid;
 grid-template-columns: 1fr;
 grid-template-rows: repeat(3, 60px);
 grid-gap: 0px;
 margin-top: 10px;
 grid-auto-rows: 60px;
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
 grid-template-columns: 1.6fr 4fr;
`;

 const Ava = styled.img`
  width: 45px;
  height: 40px;
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
           <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <Ava src={picUrl}></Ava>
           </div>
           <div style={{ fontSize: 18 ,display: "flex", justifyContent:"start",alignItems: "center",borderBottom: "1px solid rgba(206, 193, 193, 0.53)"}}><p>{this.props.name}</p></div>
         </Row>
     )
   }
 }


export class Match extends React.Component{
// handle the setting putton
 handleNope(){
   // nothing work here but update the current suggestion
   alert('like');
  // ReactDOM.render(<LogoutPage />,document.getElementById('desktop'))
 }
 handleLike(){
   // store the like in on ohter user profile if they like you then you may see him
   // and update the suggestion
   alert('nope')
 }
 handleProfile(){
   // see the suggest user profile
   alert('pro')
 }
 //            <img style={{borderRadius: "50%",margin:" 10 0 0 10", border:" 2px solid #fff",width:45,height:" 40px"}} src={url} onClick={this.handleProfile}/>
render(){
  //const listItems = allUser.map(allUsers => allUsers.hasura_id!==currentUser_id && <Item  name={allUsers.name} pic={allUsers.profile_file_id} />);

  //let url = "https://filestore.embroidery86.hasura-app.io/v1/file/"+this.props.id;
    return(
      <CenterPannel>
        <Pannel_1>
          <Head>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
               <div style={{display:"flex",justifyContent:"center",marginRight: -10}}>
                 <img style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={tinderUrl} />
               </div>
               <div style={{display:"flex",justifyContent:"center",marginRight: 30}}>
                <img  style={{borderRadius: "100%", border:" 2px solid #fff",width: "50px",height:" 40px", marginTop: 12}} src={tinderUrl} />
              </div>
           </div>
          </Head>
          <Middle>
            <Matches id="allu">

            </Matches>
          </Middle>
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
