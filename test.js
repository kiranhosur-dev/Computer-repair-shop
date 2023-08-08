// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHau7uTqWwWv3cg5qb-NYaza_39IaSHTc",
  authDomain: "repairshop-lc.firebaseapp.com",
  databaseURL:
    "https://repairshop-lc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "repairshop-lc",
  storageBucket: "repairshop-lc.appspot.com",
  messagingSenderId: "843995901657",
  appId: "1:843995901657:web:812bcecd7667f99dfb98c8",
  measurementId: "G-9YLQN119KY",
};

function laptopCheck() {
  if (document.getElementById("f-option").checked) {
    document.getElementById("desktop").style.visibility = "visible";
    document.getElementById("laptop").style.visibility = "hidden";
  } else if (document.getElementById("s-option").checked) {
    document.getElementById("laptop").style.visibility = "visible";
    document.getElementById("desktop").style.visibility = "hidden";
  }
}

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHau7uTqWwWv3cg5qb-NYaza_39IaSHTc",
  authDomain: "repairshop-lc.firebaseapp.com",
  databaseURL:
    "https://repairshop-lc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "repairshop-lc",
  storageBucket: "repairshop-lc.appspot.com",
  messagingSenderId: "843995901657",
  appId: "1:843995901657:web:812bcecd7667f99dfb98c8",
  measurementId: "G-9YLQN119KY",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("saveForm").addEventListener("submit", submitForm);

function submitForm(e) {
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

  saveMessages(
    name,
    email,
    phonenumber,
    desktop,
    laptop,
    laptopbrand,
    laptopmodel,
    servicetag,
    cpumodel,
    complaintcat,
    pdescrip
  );

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
const saveMessages = (
  name,
  email,
  phonenumber,
  desktop,
  laptop,
  laptopbrand,
  laptopmodel,
  servicetag,
  cpumodel,
  complaintcat,
  pdescrip
) => {
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
    pdescrip: pdescrip,
  });
};

const getElementVal = (contactForm) => {
  return document.getElementById(contactForm).value;
};

async function getDataAndShowPopup() {
  try {
    const sheetURL =
      "https: docs.google.com/spreadsheets/d/1Kw8CUm-Yd-g1FKlckfQ5O4bD9NkCoxxh02v9EHdpocY/edit#gid=0"; // Replace with the URL of your Google Sheet
    const apiKey = "AIzaSyBvJM0BYRxoNN3SofVVt9bFAjwc1PwmR74"; // Replace with your API key

    //     // Fetch data from Google Sheet using the Google Sheets API
    const response = await fetch(
      `https: sheets.googleapis.com/v4/spreadsheets/${getSheetId(
        sheetURL
      )}/values/Sheet1?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Sheets API");
    }

    const data = await response.json();

    //     // Extract data from column R (assuming column R is the 18th column, since columns are 0-indexed)
    const columnIndexR = 17; // 17 corresponds to column R (0-indexed)

    //     // Get the last row of data
    const lastRow = data.values[data.values.length - 1];

    //     // Get the value of column R in the last row
    const valueInColumnR = lastRow[columnIndexR];

    //     // Display the data in a popup window
    document.getElementById("home").addEventListener("click", function () {
      window.alert("YOUR COMPLAINT NUMBER IS: " + valueInColumnR);
      document.querySelector("#popup").style.display = "none";
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    window.alert("Error fetching data. Please try again later.");
  }
}
document
  .getElementById("contactform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the default way

    //     // Disable only the input elements (exclude the button with ID "home")
    var formElements = this.elements;
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      if (element.tagName.toLowerCase() !== "button" || element.id !== "home") {
        element.disabled = true;
      }
    }

    // You can also add a message to inform users that the form has been submitted
  });

//   Function to extract the Sheet ID from the Google Sheet URL
function getSheetId(sheetURL) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = sheetURL.match(regex);
  return match ? match[1] : null;
}

async function getDataAndShowPopup() {
  try {
    const sheetURL =
      "https://docs.google.com/spreadsheets/d/1Kw8CUm-Yd-g1FKlckfQ5O4bD9NkCoxxh02v9EHdpocY/edit#gid=0"; // Replace with the URL of your Google Sheet
    const apiKey = "AIzaSyBvJM0BYRxoNN3SofVVt9bFAjwc1PwmR74"; // Replace with your API key

    // Fetch data from Google Sheet using the Google Sheets API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${getSheetId(
        sheetURL
      )}/values/Sheet1?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Sheets API");
    }

    const data = await response.json();

    // Extract data from column R (assuming column R is the 18th column, since columns are 0-indexed)
    const columnIndexR = 17; // 17 corresponds to column R (0-indexed)

    // Get the last row of data
    const lastRow = data.values[data.values.length - 1];

    // Get the value of column R in the last row
    const valueInColumnR = lastRow[columnIndexR];

    // Display the data in a popup window
    window.alert("YOUR COMPLAINT NUMBER IS: " + valueInColumnR);
    document.querySelector("#popup").style.display = "none";
  } catch (error) {
    console.error("Error fetching data:", error);
    window.alert("Error fetching data. Please try again later.");
  }
}

document
  .getElementById("contactform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the default way

    // Disable only the input elements (exclude the button with ID "home")
    var formElements = this.elements;
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      if (element.tagName.toLowerCase() !== "button" || element.id !== "home") {
        element.disabled = true;
      }
    }

    // Call the function to fetch and show the popup
    getDataAndShowPopup();
  });

// Function to extract the Sheet ID from the Google Sheet URL
function getSheetId(sheetURL) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = sheetURL.match(regex);
  return match ? match[1] : null;
}
