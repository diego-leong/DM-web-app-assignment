async function getAllRecords() {
  let getResultElement = document.getElementById("artists");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patSjsYftN8dHvuLD.2a252c2c4acbf7903434fe61f13674cc5ed50e7c6bcc37d8bcb3e462cc52c3f2`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appUpsniSDwFioCAm/Table`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object / .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
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

async function getOneRecord(id) {
  let musicResultElement = document.getElementById("artists");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patSjsYftN8dHvuLD.2a252c2c4acbf7903434fe61f13674cc5ed50e7c6bcc37d8bcb3e462cc52c3f2`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appUpsniSDwFioCAm/Table/${id}`,
    options,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object / .records array

      let artistPhoto = data.fields["ArtistPhoto"]; // here we are getting column values
      let name = data.fields["Name"]; //here we are using the Field ID to fecth the name property
      let song = data.fields["Song"];
      let genre = data.fields["Genre"];
      let songLink = data.fields["SongMP3"];

      let newHtml = `
        <div class="row cardImageText center p-5">
        <div class=" info lacquer-regular">
        <div class="artist-name lacquer-regular ">
            <div>${name}</div>
        </div>
      </div>
      </div>
        </div>

      <div class="rol  p-5 artists-background ">
        ${
          artistPhoto
            ? `<img class="artists-img2" src="${artistPhoto[0].url}">`
            : ``
        }
     <div class=" col p-5 audio-position">   
        <audio controls>
          <source src="${songLink[0].url}" type="audio/mpeg">
        </audio>
     </div>


      </div>


        
    `;
        

      musicResultElement.innerHTML = newHtml;
    });
}
//Nose
// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["?id=", "OUR ID"]
  // call function for the dropdown menu
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  // call function for the dropdown menu
  getAllRecords(); // no id given, fetch summaries
}

