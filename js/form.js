const scriptURL =
  "https://script.google.com/macros/s/AKfycbxOmJRPY69UzmZQGOQSPdkcIV5h7eT_MiIab1c-WQKW1F25nXiD-0w2nh2q_E-99Qke/exec";
const form = document.forms["google-sheet"];

function complaintsubmit() {
  showLoadingAnimation(); // Show the loading animation

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      return sleep(2000); // Adjust the delay here (in milliseconds)
    })
    .then(() => {
      hideLoadingAnimation(); // Hide the loading animation when the pop-up appears
      // Add your code to show the pop-up or do any other action here
      alert(
        "Your Service request is placed successfully. Our Executives will get back to you shortly. For tracking the status, use the service request Number in the given format."
      );
    })
    .catch((error) => console.error("Error!", error.message));
}

function showLoadingAnimation() {
  document.getElementById("loadingOverlay").style.display = "block";
}

function hideLoadingAnimation() {
  document.getElementById("loadingOverlay").style.display = "none";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.getElementById("home").disabled = true;

// When the form is submitted, enable the "enable" button
document.querySelector("form").addEventListener("submit", function (event) {
  document.getElementById("home").disabled = false;
});

let isPopupShown = false; // Flag to track whether the popup has been shown

async function getDataAndShowPopup() {
  if (isPopupShown) {
    return; // If the popup has already been shown, do not proceed
  }

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

    // Introduce a time delay of 3 seconds (3000 milliseconds)
    setTimeout(function () {
      // Display the data in a popup window
      window.alert("YOUR COMPLAINT NUMBER IS: " + valueInColumnR);
      document.querySelector("#popup").style.display = "none";

      isPopupShown = true; // Set the flag to indicate the popup has been shown
    }); // 3 seconds delay (3000 milliseconds)
  } catch (error) {
    console.error("Error fetching data:", error);
    window.alert("Error fetching data. Please try again later.");
  }
}

document.getElementById("contactform");

// Disable only the input elements (exclude the button with ID "home")
var formElements = this.elements;
for (var i = 0; i < formElements.length; i++) {
  var element = formElements[i];
  if (element.tagName.toLowerCase() !== "button" || element.id !== "home") {
    element.disabled = true;
  }
}

// Call the function to fetch and show the popup after form submission
getDataAndShowPopup();

// Function to extract the Sheet ID from the Google Sheet URL
function getSheetId(sheetURL) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = sheetURL.match(regex);
  return match ? match[1] : null;
}
function reloadPage() {
  // Temporarily remove the 'required' attribute from form fields
  var formFields = document.querySelectorAll("form input[required]");
  formFields.forEach(function (field) {
    field.removeAttribute("required");
  });

  // Reload the page
  location.reload();
}
