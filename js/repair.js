// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAHau7uTqWwWv3cg5qb-NYaza_39IaSHTc",
  authDomain: "repairshop-lc.firebaseapp.com",
  databaseURL: "https://repairshop-lc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "repairshop-lc",
  storageBucket: "repairshop-lc.appspot.com",
  messagingSenderId: "843995901657",
  appId: "1:843995901657:web:812bcecd7667f99dfb98c8",
  measurementId: "G-9YLQN119KY"
});
// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) 
{
    e.preventDefault();

  var name = document.getElementById("Field1").value;
  var email = document.getElementById("Field2").value;
  var phonenumber = document.getElementById("Field3").value;
  var desktop = document.getElementById("f-option").value;
  var laptop = document.getElementById("s-option").value;
  var laptopbrand = document.getElementById("Field5").value;
  var laptopmodel = document.getElementById("Field6").value;
  var servicetag = document.getElementById("Field7").value;
  var cpumodel = document.getElementById("Field8").value;
  var complaintcat = document.getElementById("Field9").value;
  var pdescrip = document.getElementById("Field10").value;


    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("contactForm").reset();
}
// Add the data to the database
const saveMessages = (name, email, phonenumber, desktop, laptop, laptopbrand,laptopmodel, servicetag, cpumodel, complaintcat, pdescrip) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({  
  name: name,
  email: email,
  phonenumber: phonenumber,
  desktop: desktop,
  laptop: laptop,
  laptopbrand: laptopbrand,
  laptopmodel: laptopmodel,
  servicetag: servicetag,
  cpumodel: cpumodel,
  complaintcat: complaintcat,
  pdescrip: pdescrip
});
};

const getElementVal = (contactForm) => {
  return document.getElementById(contactForm).value;
};