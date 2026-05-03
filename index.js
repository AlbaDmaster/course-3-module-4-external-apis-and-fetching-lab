// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const display = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// the fetch function
function fetchWeatherAlerts(state) {
  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);


      errorDiv.classList.add("hidden");
      errorDiv.textContent = "";

      displayAlerts(data);
      input.value = "";
    })
    .catch(error => {
      console.log(error.message);

      display.textContent = "";
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    });
}

// the  display function
function displayAlerts(data) {
  display.innerHTML = "";

  const alerts = data.features;

  const title = data.title;
  const count = alerts.length;


  const summary = document.createElement("h2");
  summary.textContent = `${title}: ${count}`;
  display.appendChild(summary);


  const ul = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  display.appendChild(ul);
}


button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    errorDiv.textContent = "Please enter a state abbreviation";
    errorDiv.classList.remove("hidden");
    display.textContent = "";
    return;
  }

  fetchWeatherAlerts(state);
});