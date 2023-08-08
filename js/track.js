// Wrap the code in a DOMContentLoaded event handler
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("serialForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const serialCode = document.getElementById("serialInput").value;

      // Call a function to search for the serial code in the Google Sheet and display the description
      searchAndDisplayDescription(serialCode);
    });

  function searchAndDisplayDescription(serialCode) {
    const spreadsheetId = "1Kw8CUm-Yd-g1FKlckfQ5O4bD9NkCoxxh02v9EHdpocY";
    const sheetName = "Sheet1"; // Adjust the sheet name as needed
    const apiKey = "AIzaSyBvJM0BYRxoNN3SofVVt9bFAjwc1PwmR74";
    const range = `${sheetName}!A:R`; // Adjust the columns as needed

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const values = data.values;
        for (const row of values) {
          if (row[17] === serialCode) {
            // Display the description from column R (index 17)
            let description;
            if (row[11] === "S") {
              description = "Service";
            } else if (row[11] === "D") {
              description = "Delivered";
            } else {
              description = "Unknown";
            }
            document.getElementById("descriptionContainer").innerText =
              description;
            return;
          }
        }
        document.getElementById("descriptionContainer").innerText =
          "Serial code not found.";
      })
      .catch((error) => {
        console.error("Error retrieving sheet data:", error);
      });
  }
});
