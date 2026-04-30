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

    //   carousel only, should only show on the homepage, not detailed. 
      newHtml+=`
<!-- CAROUSEL
<div id="carouselExample" class="carousel slide carousel-fade" 
     data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">

  <div class="carousel-inner">

    <div class="carousel-item active position-relative">
      <img class="splash-image" src="/resources/img/splash/splash-raw/AmericanCyclerySplash.jpeg" 
           class="d-block w-100 rounded" alt="image broken">
      <div class="overlay"></div>
    </div>

    <div class="carousel-item position-relative">
      <img class="splash-image" src="resources/img/splash/splash-raw/bespoke.webp" 
           class="d-block w-100 rounded" alt="image broken">
      <div class="overlay"></div>
    </div>

    <div class="carousel-item position-relative">
      <img class="splash-image" src="resources/img/splash/splash-raw/huckleberrySplash.webp" 
           class="d-block w-100 rounded" alt="image broken">
      <div class="overlay"></div>
    </div>

    <div class="carousel-item position-relative">
      <img class="splash-image" src="resources/img/splash/splash-raw/NewWheelSplash.webp" 
           class="d-block w-100 rounded" alt="image broken">
      <div class="overlay"></div>
    </div>

    <div class="carousel-item position-relative">
      <img class="splash-image" src="resources/img/splash/splash-raw/roaringsplash.jpg" 
           class="d-block w-100 rounded" alt="image broken">
      <div class="overlay"></div>
    </div>

  </div>
</div>
END CAROUSEL -->

    <!-- About section -->
    <!-- About Title -->
    <h2 class="title-stencil fs-1 pt-5 text-center text-white">Explore the City's Bike Shops</h2> 
    <!-- About Paragraph -->
    <div class="row">
        <div class="col mx-5">
            <p id="about-text" class="text-center text-white ms-3 me-3">
                Discover bike shops across San Francisco and compare locations, specialties, and community vibes to help you choose your perfect shop.
            </p>
        </div>
    </div>    
         
      `


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
        
        <div class="col-xl-4">
            <a  href="index.html?id=${data.records[i].id}"> <!-- link to the detailed view-->
                <div class="card ratio ratio-16x9 my-3 mx-1.5 border-0">

                    <img class="shop-image card-img " src="${shopImage[0].url}" alt="A photo of ${shopName}'s storefront.">
                    
                    <div class="shopCard-list-text card-img-overlay">
                        <h3 class="title-stencil card-title"><strong>${shopName}</strong></h5>
                        <p class="card-text">
                                ${shopHood}
                        </p>
                        <p class="card-text"><small>${descriptionIdeas}</small></p>
                    </div>

                    
                </div>
            </a>
        </div>

        
        `;
        
      }
      newHtml +=`
        `


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
            <div class="container mx-5">
                <header>
                    <h1 class="title-stencil">${shopName}</h1>
                    <p>${shopHood}</p>
                </header>
                <img class="py-2 shop-image-detail rounded" src="${shopImage[0].url}" alt="Photo of the ${shopName} bike shop">
                <h2>About</h2>
                <p>${descriptionIdeas}</p>
                <p>Does this shop host community rides? <strong>${hasRides}</strong></p>
                <h2>Location Info</h2>
                <a class="text-decoration-none" href="${mapsLink}">${shopAddress}<a>
                <br>
                <iframe src="${mapsEmbedLink}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            
                <h2>Contact</h2>
                <ul>
                    <li>${shopEmail}</li>
                    <li>Phone:${shopPhone}</li>
                    <li>Contact Page: ${contactPage}</li>
                    <li>Shop Website: <a class="text-decoration-none" href="${shopWebsite}">${shopWebsite}<a></li>
                    <li>About Page: ${aboutPage}</li>
                </ul>
                                

                

            </div>
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