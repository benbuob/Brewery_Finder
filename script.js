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
    const [data] = JSON.parse(this.responseText); //destructuring to get object, otherwise its an array with one object
    console.log(data);

    const html = `<article class="brew">
                <h2>Brewery Near You!</h2>
                <h3 class="brew__name">Name: ${data.name}</h3>
                <h3 class="brew__street">Address: ${data.street}</h3>
                <h3 class="brew__type">Brewery type: ${data.brewery_type}</h3>
                <h3 class="brew__website">Brewery website: ${data.website_url}</h3>
                <h3 class="brew__country">Country: ${data.country}</h3>
                <h3 class="brew__state">State: ${data.state}</h3>
                <h3 class="brew__city">City: ${data.city}</h3>
            </article>`;

    breweries.insertAdjacentHTML("beforeend", html);
  });
};
