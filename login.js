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

firebase.initializeApp(firebaseConfig);
var firebaseRef = firebase.database().ref("okkk");
var x;
firebaseRef.on("value", function (snapshot) {
  x = snapshot.val();
  console.log(x);


})


function login() {
    var username = document.getElementById('name').value
    var pw = document.getElementById('pass').value
    var credentials = {
        username: username,
        pw: pw
    }
    console.log(credentials)

    
    for(credentials in x) {
        if (true) {
            alert('Login Successful');
            window.location="home.html";
            // window.location.replace('home.html');
            // // return false;
        } 
    }

    
}