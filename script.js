// Request the data from airtable for the non-detailed view
async function getAllRecords() {
  let getResultElement = document.getElementById("bikeshops");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patG7MOU6Aqq0Ldfn.df4c7f392712b37e3c0c946ea21e91e0d85fe57057832a567453d0099fa78391
`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/apprw8LmItCvf4qHG/Table%201`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let storefront = data.records[i].fields["fldfBMpsrqCUW7heN"]; // here we are getting column values
        let name = data.records[i].fields["fldlgmb8nwClgR3ej"]; //here we are using the Field ID to fecth the name property

        // html code for the cards
        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="breweries.html?id=${data.records[i].id}">${
          storefront
            ? `<img class="card-img-top rounded" alt="${name}" src="${storefront[0].url}">`
            : ``
        }
          </a>
          </div>
          </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// If detailed 
// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // call function to hide search bar
  myFunction();
  // has at least ["?id=", "OUR ID"]
  // call function for the dropdown menu
  dropdown();
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  //deleted code for the search bar since we are not using it
  // call function for the dropdown menu
  dropdown();
  getAllRecords(); // no id given, fetch summaries
}

getAllRecords();
