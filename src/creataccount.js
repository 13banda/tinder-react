import React from 'react';
import styled from 'styled-components'
import {elementById, takeToHome} from './module'

const Pannel =styled.div`
  width: 100%;
  height: 100%;
`;
const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 90px;
  background: #fff;
  border: 1px solid #0000001a;
`;
const TinderLogo = styled.div`
 width: 150px;
 margin-left: 6%;
`;
const H3 = styled.div`
      font-style: italic;
      font-weight: bolder;
      font-size: x-large;
      font-weight: 753px;
      line-height: 2.em;
      text-transform: uppercase;
      word-wrap: break-word;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
`;
const Textarea = styled.textarea`
  width: 300px;;
  padding: 0.8em;
  border: 1px solid #eaeaea;
  background-color: #efefef;
  cursor: text;
  box-sizing: border-box;
  border-radius: 5px;
  color: #555;
  font-weight: 700;
  line-height: 1.2em;
  font-size: initial;
  display: block;
  margin: 20px;
  &:focus{
    background: white;
    outline: 0;
    border: 2px solid #465867;
  }
`;
const Input = styled.input`
  width: 300px;;
  padding: 0.8em;
  border: 1px solid #eaeaea;
  background-color: #efefef;
  cursor: text;
  box-sizing: border-box;
  border-radius: 5px;
  color: #555;
  font-weight: 700;
  line-height: 1.2em;
  font-size: initial;
  display: block;
  margin: 20px;
  &:focus{
    background: white;
    outline: 0;
    border: 2px solid #465867;
  }
`;
const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BtnContinue = styled.button`
    padding: 10px 42px;
    border-radius: 10px;
    background: #e12525;
    color: #fff;
    border: 1px solid aliceblue;
    margin-left: 84px;
`;
export class Acreacte extends React.Component{

// handle account creation doing some validte input and store on server
  handleAc(){
          const name = elementById('name').value;
          const email = elementById('email').value;
          const gender = elementById('gender').value;
          const age = elementById('age').value;
          const about = elementById('about').value;
          const city = elementById('city').value;
          const file = elementById('photo')
          const btnContinue = elementById('continue');
          btnContinue.innerHTML = 'Sending ...'
          //validating input here and upload to server
           uploadUserDetail(name,email,gender,file,age,about,city);
         //if response is treu the put user to home  call taketohome mnthod
          setTimeout(50);// waiting to uploading...here

  }
  //  <input type="file" style={{display:"none"}} id="inputfile"/>}
  render(){
    return (
      <Pannel>
        <Navbar>
          <TinderLogo>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 33"><defs><linearGradient id="a" x1="24.2%" x2="79.9%" y1="115.7%" y2="8%"><stop offset="0%" stop-color="#FF7854"/><stop offset="100%" stop-color="#FD267D"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(#a)" d="M8.4 13.2c6.3-2 7.3-7.8 6.5-13 0 0 0-.3.2-.2C21.2 3 28 9.3 28 19c0 7.2-5.7 13.7-14 13.7-9 0-14-6.3-14-13.8 0-4.5 3-9 6.5-11 0 0 .3 0 .3.2 0 1 .4 3.5 1.5 5z"/><path fill="#424242" d="M45.6 27l.5-.6 1.5 4.5h-.2c-1 1-2.6 1.6-4.7 1.6-2 0-3.4-.6-4.4-1.6-1-1-1.6-2.5-1.6-4.4V14.4H33v-5h3.6v-6h5.6v6h4.3v5H42v11c0 .5.2 2.2 1.8 2.2.8 0 1.5-.3 1.8-.7zm3 5V9.5H54V32h-5.5zM51.2.3c1.8 0 3.3 1.5 3.3 3.3 0 2-1.5 3.4-3.3 3.4C49.5 7 48 5.5 48 3.6 48 1.8 49.5.3 51.3.3zM69 9c4.8 0 7.4 2.6 7.4 7.3V32H71V17.6c-.2-2.5-1.5-3.7-4-3.7-2.4 0-4.3 1.3-5.3 2.6V32h-5.5V9.5h5.5V12c1.6-1.7 4.2-3 7.3-3zm26 2.8V1.2h5.4v31H95v-2.5c-2 2-4.3 3-6.7 3-6 0-10-5-10-12S82.2 9 88.2 9c2.5 0 4.8 1 6.6 2.8zm0 4.8C93.7 15 91.5 14 89.5 14c-3.4 0-5.7 2.7-5.7 6.8 0 4 2.2 6.8 5.6 6.8 2 0 4.2-1 5.3-2.6v-8.4zM113.2 9c6.6 0 11.2 5 11.2 12.2v1.5h-16.8c.6 3.2 3 5.2 6.5 5.2 2 0 4.5-1 6-2.4l.2-.3L123 29l-.2.3c-2.2 2-5.4 3.3-9 3.3-7 0-12-5-12-11.8 0-6.8 5-12 11.5-12zm-5.6 9.6H119c-.3-3.4-3-5-5.7-5-3.8 0-5.3 3-5.6 5zM138 9h.3v5.6h-.5c-.4-.2-1-.3-1.4-.3-1.8 0-4.3 1.3-5.2 2.6v15h-5.6V9.5h5.6V12c1.8-2 4.3-3 6.7-3z"/></g></svg>
          </TinderLogo>
        </Navbar>
        <MainContent>
          <div style={{display: "block"}}>
            <H3>CREATE ACCOUNt</H3>
            <Input id="name" placeholder="First Name" type="text" />
            <Input id="email" placeholder="Email" type="email" />
            <Input id="gender" placeholder="Gender" type="text" />
            <Input id="age" placeholder="Age" type="text" />
            <Input id="city" placeholder="city" type="text" />
            <Textarea id="about" rows="4" cols="50" placeholder="about me" wrap="hard">
              </Textarea>
            <Input id="photo"  type="file" />
            <BtnContinue id="continue"
             onClick={this.handleAc}
              >Continue</BtnContinue>
          </div>
        </MainContent>
      </Pannel>
    );
  }
}


function uploadUserDetail(name,email,gender,file,age,about,city)
{
  // some AJAX api and using other to upload file
  // there is some AJAX call to put data to server
  // profile uploading file
   var url = "https://filestore.embroidery86.hasura-app.io/v1/file";
  let file_id;
  let userDetails;
  // This is the file we are going to upload, replace this with your file
  //  var file = file;

  // If you have the auth token saved in offline storage
   var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
  // headers = { "Authorization" : "Bearer " + authToken }
  var requestOptions = {
  	method: 'POST',
  	headers: {
        "Authorization": "Bearer " + authToken
  	},
  	body: file.files[0]
  }

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log(result);
    // when Sucess fully return true
    userDetails = result;
    insertUser(result,name,email,gender,age,about,city)
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
    alert('something went wrong please try again...')
  });

  // now we hav profile id put it on user details user table.ok

}

function insertUser(userDetails,name,email,gender,age,about,city){

  // normal user can not insert but foor now we can add admoin auth.
  var url = "https://data.embroidery86.hasura-app.io/v1/query";

  // If you have the auth token saved in offline storage
   var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
  // headers = { "Authorization" : "Bearer " + authToken }
  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Authorization":" Bearer 63bcb0e4a6a53ea0682e06f81f601ea855ab52abaa644551"
      }
  };

  var body = {
      "type": "insert",
      "args": {
          "table": "userinfo",
          "objects": [
              {
                  "hasura_id": userDetails.user_id,
                  "name": name,
                  "email": email,
                  "gender": gender,
                  "profile_file_id": userDetails.file_id,
                  "age":age,
                  "about_me": about,
                  "city": city
              }
          ]
      }
  };

  requestOptions.body = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(results) {
  	console.log(results);
    if(results.code!=="parse-failed"){
      let r ={
        hasura_id: userDetails.user_id,
      }
    takeToHome(r);
  }else{
    alert("something went wrong please try again");
  }
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}
