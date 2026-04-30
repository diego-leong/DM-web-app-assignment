//SECTION
//function to fetch the list view
async function getAllRecords() {
  let getResultElement = document.getElementById("injectionSite"); //points to html injection div

  const options = {
    method: "GET",
    headers: {
      //airtable token after Bearer
      Authorization: `Bearer patG7MOU6Aqq0Ldfn.df4c7f392712b37e3c0c946ea21e91e0d85fe57057832a567453d0099fa78391`, 
    },
  };

  //fetch request
  await fetch(`https://api.airtable.com/v0/apprw8LmItCvf4qHG/Table%201`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object / .records array

      getResultElement.innerHTML = ""; // clear everything

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) { 
        // defining the columns as variables for quick access
        
        //Bare bones data
            let shopName = data.records[i].fields["shopName"]; // here we are getting column values
            let shopImage = data.records[i].fields["shopImage"];
            let shopWebsite = data.records[i].fields["shopWebsite"];

        //Contact data
            let shopPhone = data.records[i].fields["shopPhone"];
            let shopEmail = data.records[i].fields["shopEmail"];
            let contactPage = data.records[i].fields["contactPage"];

        //Location data
            let hasRides = data.records[i].fields["hasRides"];
            let zipCode = data.records[i].fields["zipCode"];
        
        //Qualitative data
            let shopAddress = data.records[i].fields["shopAddress"];
            let mapsLink = data.records[i].fields["mapsLink"];
            let mapsEmbedLink = data.records[i].fields["mapsEmbedLink"];
            let shopHood= data.records[i].fields["shopHood"];
            let descriptionIdeas = data.records[i].fields["descriptionIdeas"];
            let aboutPage = data.records[i].fields["aboutPage"];


        //to be injected
        newHtml += `
        
        <div class="col cardImageText p-2 song-card center">

            <p>${shopName}</p>
            <a href = "index.html?id=${data.records[i].id}">
                <p>link which adds unique "?id=..." identifier to the end of the address</p>
            </a>

            <p>${shopWebsite}</p>
            <p>${shopAddress}</p>
            <p>${mapsLink}</p>
            <p>${mapsEmbedLink}</p>
            <p>${shopPhone}</p>
            <p>${shopEmail}</p>
            <p>${hasRides}</p>
            <p>${shopHood}</p>
            <p>${descriptionIdeas}</p>
            <p>${aboutPage}</p>
            <p>${zipCode}</p>
            <p>${contactPage}</p>
            <img class="artists-img" src="${shopImage[0].url}">
        </div>
        

        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

//SECTION
//function to fetch the detailed view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("injectionSite");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patG7MOU6Aqq0Ldfn.df4c7f392712b37e3c0c946ea21e91e0d85fe57057832a567453d0099fa78391`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/apprw8LmItCvf4qHG/Table%201/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // response is a single object
        //Bare bones data
            let shopName = data.fields["shopName"]; // here we are getting column values
            let shopImage = data.fields["shopImage"];
            let shopWebsite = data.fields["shopWebsite"];

        //Contact data
            let shopPhone = data.fields["shopPhone"];
            let shopEmail = data.fields["shopEmail"];
            let contactPage = data.fields["contactPage"];

        //Location data
            let hasRides = data.fields["hasRides"];
            let zipCode = data.fields["zipCode"];
        
        //Qualitative data
            let shopAddress = data.fields["shopAddress"];
            let mapsLink = data.fields["mapsLink"];
            let mapsEmbedLink = data.fields["mapsEmbedLink"];
            let shopHood= data.fields["shopHood"];
            let descriptionIdeas = data.fields["descriptionIdeas"];
            let aboutPage = data.fields["aboutPage"];

        let newHtml = `
            <div>
            <p>
                If you can read this, the detailed view for ${shopName} works!
            </p>
            </2div>
        `;

        jobsResultElement.innerHTML = newHtml;
    });
}


//reads the page's url, and 

    let idParams = window.location.search.split("?id=");
    if (idParams.length >= 2) {
    // has at least ["?id=", "OUR ID"]
    // call function for the dropdown menu
    getOneRecord(idParams[1]); // create detail view HTML w/ our id
    } else {
    // call function for the dropdown menu
    getAllRecords(); // no id given, fetch summaries
    }