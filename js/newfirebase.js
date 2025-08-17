
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import {getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js'

  const firebaseConfig = {
    apiKey: "AIzaSyCmbu1wDfl8Qm6lKb-ciJ5xYC0DUlZYPsY",
    authDomain: "okkk-4579e.firebaseapp.com",
    databaseURL: "https://okkk-4579e-default-rtdb.firebaseio.com",
    projectId: "okkk-4579e",
    storageBucket: "okkk-4579e.appspot.com",
    messagingSenderId: "803104447615",
    appId: "1:803104447615:web:e121cb6a8066c37b82f34a",
    measurementId: "G-YZG1EF84WH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
  sighUp.addEventListener('click',(e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       // Signed in 
        const user = userCredential.user;
  
        set(ref(database, 'users/' + user.uid),{
            username: username,
            email: email
        })
  
        alert('user created!');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(errorMessage);
      // ..
      });
  
  });
  
   login.addEventListener('click',(e)=>{
     var email = document.getElementById('email').value;
     var password = document.getElementById('password').value;
  
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
  
          const dt = new Date();
           update(ref(database, 'users/' + user.uid),{
            last_login: dt,
          })
  
           alert('User loged in!');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          alert(errorMessage);
    });
  
   });
  
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      //bla bla bla
      // ...
    } else {
      // User is signed out
      // ...
      //bla bla bla
    }
  });
  
  logout.addEventListener('click',(e)=>{
  
     signOut(auth).then(() => {
       // Sign-out successful.
       alert('user loged out');
     }).catch((error) => {
       // An error happened.
       const errorCode = error.code;
       const errorMessage = error.message;
  
          alert(errorMessage);
     });
  
  });
  

