//function to fetch the list view, aka all the elements
async function getAllRecords() {
  let getResultElement = document.getElementById("bikeshops"); //points to html injection div

  const options = {
    method: "GET",
    headers: {
      //airtable token after Bearer
      Authorization: `Bearer patG7MOU6Aqq0Ldfn.df4c7f392712b37e3c0c946ea21e91e0d85fe57057832a567453d0099fa78391`, 
    },
  };

  await fetch(`https://api.airtable.com/v0/appUpsniSDwFioCAm/Table`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object / .records array

      getResultElement.innerHTML = ""; // clear everything

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) { // defining the 
        let artistPhoto = data.records[i].fields["ArtistPhoto"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let song = data.records[i].fields["Song"];
        let genre = data.records[i].fields["Genre"];
        let album = data.records[i].fields["AlbumPhoto1"];

        newHtml += `
        
        <div class="col cardImageText p-2 song-card center">
        <a href = "index.html?id=${data.records[i].id}">${
          album
            ? `<img class="artists-img" src="${album[0].url}" ></img>` // Add album ALT!!!!!
            : ``
        }
        </a>
        </div>
      
        <div class="info dm-sans">
        <div>${name}</div>
        <div>${song}</div>
        <div>${genre}</div>
        </div>
        </div>
        

        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}