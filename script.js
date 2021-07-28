const breweries = document.querySelector(".breweries");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(position) {
  const coordinates = position.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${coordinates.latitude}`);
  console.log(`Longitude: ${coordinates.longitude}`);
  console.log(`More or less ${coordinates.accuracy} meters.`);
  getBreweries(coordinates.latitude, coordinates.longitude);
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

const getBreweries = function (latitude, longitude) {
  const request = new XMLHttpRequest();
  request.open(
    "Get",
    `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}`
  );
  request.send(); //send off the request, fetches data in background. when done, emits load event.

  request.addEventListener("load", function () {
    //as soon as the data arrives, this callback function executes
    // console.log(this.responseText);                // same as request.responseText

    //puuting [] around data will destructure and return only one brewery.
    const data = JSON.parse(this.responseText); //destructuring to get object, otherwise its an array with one object
    console.log(data);

    const html = `<article class="brew">
                <h2 class="brew__name">${data[0].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[0].street}, ${data[0].city}</h4>
                <h4 class="brew__website"><a href="${data[0].website_url}" target="_blank">Visit Website</a></h4>
            </article>
            
            <article class="brew">
                <h2 class="brew__name">${data[1].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[1].street}, ${data[1].city}</h4>
                <h4 class="brew__website"><a href="${data[1].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[2].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[2].street}, ${data[2].city}</h4>
                <h4 class="brew__website"><a href="${data[2].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[3].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[3].street}, ${data[3].city}</h4>
                <h4 class="brew__website"><a href="${data[3].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[4].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[4].street}, ${data[4].city}</h4>
                <h4 class="brew__website"><a href="${data[4].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[5].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[5].street}, ${data[5].city}</h4>
                <h4 class="brew__website"><a href="${data[5].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[6].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[6].street}, ${data[6].city}</h4>
                <h4 class="brew__website"><a href="${data[6].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[7].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[7].street}, ${data[7].city}</h4>
                <h4 class="brew__website"><a href="${data[7].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[8].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[8].street}, ${data[8].city}</h4>
                <h4 class="brew__website"><a href="${data[8].website_url}" target="_blank">Visit Website</a></h4>
            </article>

            <article class="brew">
                <h2 class="brew__name">${data[9].name} <i class="fas fa-beer"></i></h2>
                <h4 class="brew__street">Address: ${data[9].street}, ${data[9].city}</h4>
                <h4 class="brew__website"><a href="${data[9].website_url}" target="_blank">Visit Website</a></h4>
            </article>
            
            `;

    breweries.insertAdjacentHTML("beforeend", html);
  });
};
