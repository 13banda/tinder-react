import React from 'react';
import styled from 'styled-components';
//import {Logo} from 'https://filestore.embroidery86.hasura-app.io/v1/file/c5cebbc8-4b90-4773-a54e-71583099711e'
import ReactDOM from 'react-dom';
import {Drover} from './home'
import { Acreacte} from './creataccount.js'

// components here
const Input = styled.input`
  padding: 0.6em;
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
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 4px;
  width: 63%;
  &:focus{
    background: white;
    box-shadow: 0px 0px 9px 0px #e20f0fbf;
    outline: 0;
    border: 0.5px solid #ec6e56;
  }
`;
const Button = styled.button`
    padding: 10px 38px;
    background: -moz-repeating-radial-gradient;
    border: 1px solid aliceblue;
    border-radius: 6px;
    color: white;
    background: #fe5068;
    font-weight: bold;
`;

const TinderLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const P = styled.p`
  font-size: 1.5em;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
  `;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
   margin-top: 15px;
`;
// get the element by Id ..
export function elementById(id){
  return document.getElementById(id);
}

function validatInput(username,password){
  return (username !== "") ? (password !== "") ? "true"  : "false" : "false";
}

//<Drover></Drover>
export function takeToHome(result){
  const curentU = result.hasura_id;
  let p;
  var url = "https://data.embroidery86.hasura-app.io/v1/query";
   console.log(result)

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
      "type": "select",
      "args": {
          "table": "user",
          "columns": [
              "*"
          ],
      }
  };

  requestOptions.body = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
   return response.json();
  })
  .then(function(result) {
    console.log(result);
    /*
    "where": {
      "hasura_id": {
          "$eq": result.hasura_id
      }
    }*/

    result.map( s =>{if(s.hasura_id=== curentU ){ p = s;} });
    const r = (
      <div>
        <Drover logedUser={p} id={curentU} userInfo={result}></Drover>
      </div>
    );
    ReactDOM.render(r,document.getElementById('root'));

  })
  .catch(function(error) {
   console.log('Request Failed:' + error);
    alert('something went wrong')
  });
}

export function takeToAccountCreate(result){

  const r = (
    <div>
      <Acreacte></Acreacte>
    </div>
  );
  ReactDOM.render(r,document.getElementById('root'));
}

/*
  login with the username & password
*/
function login(username,password){

    var url = "https://auth.embroidery86.hasura-app.io/v1/login";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    var body = {
        "provider": "username",
        "data": {
            "username": username,
            "password": password
        }
    };

    requestOptions.body = JSON.stringify(body);

    fetch(url, requestOptions)
    .then(function(response) {
    	return response.json();
    })
    .then(function(result) {
      if(result.detail ===null){
        let BtnLogin = elementById('login');
        BtnLogin.innerHTML = "login";
        alert('username & password are incorrect');
      }
      else{
      	// To save the auth token received to offline storage
       var authToken = result.auth_token
       window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
        window.localStorage.setItem('C_ID', result.hasura_id);
       takeToHome(result)
      }
    })
    .catch(function(error) {
    	console.log('Request Failed:' + error);
      let BtnLogin = elementById('login');
      BtnLogin.innerHTML = "login";
      alert('something went wrong please try again');
    });
}

//sign up with username & password here
function signUp (username,password){
    var url = "https://auth.embroidery86.hasura-app.io/v1/signup";
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var body = {
        "provider": "username",
        "data": {
            "username": username,
            "password": password,
        }
    };
    requestOptions.body = JSON.stringify(body);
    fetch(url, requestOptions)
    .then(function(response) {
    	return response.json();
    })
    .then(function(result) {
      if(result.detail === null){
        let BtnSignUp = elementById('signup');
        BtnSignUp.innerHTML = "Sign-in";
        alert('user already have try another username');
      }
      else{
    	 // To save the auth token received to offline storage
    	 var authToken = result.auth_token
    	 window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
       window.localStorage.setItem('C_ID', result.hasura_id);
       takeToAccountCreate(result);
     }
       // Navigate to the Location.reload article
      //document.location.assign('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload');
    })
    .catch(function(error) {
      let BtnSignUp = elementById('signup');
      BtnSignUp.innerHTML = "Sign-in";
    	console.log('Request Failed:' + error);
    });
}

// pack  the login and sign screen in one component here
export class Login extends React.Component{
  handleLogin(){
    let InputUser = elementById('username').value;
    let InputPassword = elementById('password').value;
    if(validatInput(InputUser,InputPassword) === 'true'){
      let BtnLogin = elementById('login');
      BtnLogin.innerHTML = "logging ... ";
      login(InputUser,InputPassword);
      BtnLogin.innerHTML = "login Sucess ";
    }
    else{
      alert('please fill username & password')
    }
  }
  handleSignUp(){
    let InputUser = elementById('username').value;
    let InputPassword = elementById('password').value;
    if(validatInput(InputUser,InputPassword) === 'true'){
      if(InputPassword.length >= 8){
        let BtnSignUp = elementById('signup');
        BtnSignUp.innerHTML = "SignUp ...";
        signUp(InputUser,InputPassword);
        BtnSignUp.innerHTML = "sigUp Sucess";
      } else{ alert('Minimum password length is 8 characters')}
  }
  else{
      alert('please fill username & password')
    }
  }
  render(){
    return (
      <div>
        <TinderLogo>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><defs><radialGradient id="a" cy="100%" r="106.833%" fx="50%" fy="100%"><stop offset="0%" stop-color="#FF7854"/><stop offset="100%" stop-color="#FD267D"/></radialGradient></defs><path fill="url(#a)" fill-rule="evenodd" d="M155.908 897.721a.097.097 0 0 1-.108-.03c-1.194-1.581-1.494-4.299-1.567-5.343-.015-.201-.241-.314-.422-.213-3.687 2.071-7.108 6.97-7.108 11.7 0 8.126 5.644 14.943 15.36 14.943 9.103 0 15.36-7.026 15.36-14.942 0-10.358-7.402-17.24-13.995-20.351a.237.237 0 0 0-.336.246c.849 5.582-.324 11.653-7.184 13.99z" transform="translate(-146 -883)"/></svg>
        </TinderLogo>
        <P>GET STARTED</P>
        <Input id="username" placeholder="username" type="text" />
        <Input id="password" placeholder="password" type="password" />
        <ButtonContainer >
          <Button id='login' style={{ marginRight:"20px"}} onClick={this.handleLogin}>Login</Button>
          <Button id="signup" onClick={this.handleSignUp}>SignUp</Button>
        </ButtonContainer>
        </div>
    );
  }
}
