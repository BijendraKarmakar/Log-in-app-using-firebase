import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
   apiKey: "AIzaSyArI_UTXSjnA81GBNwgc65OZQwnoyVgRuM",
   authDomain: "fir-dda8e.firebaseapp.com",
   databaseURL: "https://fir-dda8e.firebaseio.com",
   projectId: "fir-dda8e",
   storageBucket: "fir-dda8e.appspot.com",
   messagingSenderId: "44985147580"
 };
 firebase.initializeApp(config);


class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');
      var hey = 'welcome '+ user.email;
      this.setState({err: hey});
      lout.classList.remove('hide');
    })

    promise.catch(e => {
      var err = e.message;
      this.setState({err: err});
    });


  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = 'welcome '+ user.email;
      firebase.database().ref('user/'+ user.uid).set({
          email: user.email
      });
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      this.setState({err: err});
    })

  }

  logout(){

    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    var hey = 'Thanks for using our site ';
    this.setState({err: hey});
    lout.classList.add('hide');
  }

  google(){

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithRedirect(provider);



    promise.then( result => {
      var user = result.user;
      firebase.database().ref('user/'+ user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });

    promise.catch(e => {
      var msg = e.message;
    })

  }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /> <br />
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /> <br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log in</button>
        <button id="logout" className="hide wide" onClick={this.logout}>Log out</button><br />
        <button className="sign" onClick={this.signup}>Sign up with Email</button>
        <button id="google" className="google" onClick={this.google}>Sign up with Google</button>


      </div>
    );
  }
}

export default Authen;
