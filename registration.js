//firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCpY9WZtDIiFXiLrN68cBKDQG5-teKUp-M",
//     authDomain: "regandlogin-4b624.firebaseapp.com",
//     projectId: "regandlogin-4b624",
//     storageBucket: "regandlogin-4b624.appspot.com",
//     messagingSenderId: "341626260012",
//     appId: "1:341626260012:web:270d02e4c09c43b4681f89"
// };

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
//firebase initialization
firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth()
// const database = firebase.database()

 
var okkk = firebase.database().ref("okkk");

document.getElementById("form").addEventListener('submit', submitForm);
var username;
var pw;
function submitForm(e) {
    e.preventDefault();

    username = getElementVal("name");
    pw = getElementVal("pass");  
    

    saveMessages(username, pw); //sends data to database

    document.querySelector('.alert').style.display = "block";  //displays registration successful

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 10000); //removes registration successful message after 10s

    document.getElementById("form").reset(); //refreshes or resets the form

}


    


const saveMessages = (username, pw) => {
    var newRegistrationForm = okkk.push();

    newRegistrationForm.set({
        username : username,
        password: pw 
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

function goToLogin() {
    alert("Successful Registration!")
    window.location="newLogin.html"; //redirect to login page
}
