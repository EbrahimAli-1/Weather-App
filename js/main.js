// https://api.open-meteo.com/v1/forecast?latitude=${select.selectedOptions[0].dataset.lat || yourLocation.latitude}&longitude=${select.selectedOptions[0].dataset.lon || yourLocation.longitude}&hourly=relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&${unit == "&deg;F" ? "temperature_unit=fahrenheit" : ""}&windspeed_unit=mph&start_date=${startDate}&end_date=${endDate}&timezone=Africa%2FCairo

let locationMenu = document.querySelector(".find-location");
let nav = document.querySelector(".nav");
let form = document.querySelector(".location-form");

// Handling The Search Bar
let handle = document.querySelector(".handle");
let search1 = document.querySelector(".location .search");
let search2 = document.querySelector(".location .icon");
search1.onclick = function () {
  locationMenu.style.left = "0";
};
search2.onclick = function () {
  locationMenu.style.left = "0";
};
handle.onclick = function () {
  locationMenu.style.left = "-100%";
};

// Getting The Current Location of The User Using GPS
let yourLocation = {};
navigator.geolocation.getCurrentPosition((p) => {
  yourLocation = p.coords;
  getCities();

  todayData();
  daysData();
});

// Using All The Data of The Location To make The Website Dynamic
let temp = document.querySelector(".temp");
let description = document.querySelector(".details .date h3");

let start_date = new Date();
let end_date = new Date();
end_date.setDate(end_date.getDate() + 5);

let todayDate = start_date.toString().split(" ");
let currentDate = document.querySelector(".p1 .date-time");
let curLocation = document.querySelector(".details .date .p2 .loc");
let wind = document.querySelector(".highlight-box .wind p");
let windDirection = document.querySelector(".wind svg");
let humidity = document.querySelector(".highlight-box .humidity p");
let humidityBar = document.querySelector(".bar span");
let visibility = document.querySelector(".highlight-box .visibility p");
let pressure = document.querySelector(".highlight-box .pressure p");
let nxtDays = document.querySelector(".main .days");
let todayImg = document.querySelector(".image img");
let unit = "&deg;C";
let feh = document.querySelector(".f");
let cel = document.querySelector(".c");

let startDate = start_date
  .toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .split("/")
  .reverse()
  .map((el, ind, arr) => {
    if (ind === 2) {
      return arr[1];
    } else if (ind === 1) {
      return arr[2];
    }
    return el;
  })
  .join("-");

let endDate = end_date
  .toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .split("/")
  .reverse()
  .map((el, ind, arr) => {
    if (ind === 2) {
      return arr[1];
    } else if (ind === 1) {
      return arr[2];
    }
    return el;
  })
  .join("-");

// Accessing Cities
let select = document.querySelector("#cities");
let input = document.querySelector("#search");
async function getCities() {
  let cities = await (
    await fetch(
      "https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json"
    )
  ).json();
  // console.log(cities);
  let modCities = cities
    .filter((el) => el.name.toLowerCase().startsWith(input.value))
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((el) => {
      return `<option data-lat="${el.lat}" data-lon="${el.lon}" value="${
        el.name
      } "${el.country.toLowerCase()}"">${
        el.name
      } "${el.country.toLowerCase()}"</option>`;
    });
  modCities.length = 50;
  select.innerHTML = `${
    yourLocation.longitude &&
    "<option value='Your Location'>Your Location</option>"
  }${modCities.join("")}`;
}

function handleDates(date) {
  return `${date
    .toLocaleString("en-US", { dateStyle: "full" })
    .substr(0, 3)},${date.getDate()} ${date.toLocaleString("en-US", {
    month: "short",
  })}`;
}

// async function geolocation(lat, lon) {}

// async function checkWeather() {
//   todayData();
//   daysData();
// }

async function todayData() {
  let data = await (
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        select.selectedOptions[0].dataset.lat || yourLocation.latitude
      }&longitude=${
        select.selectedOptions[0].dataset.lon || yourLocation.longitude
      }&hourly=relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&${
        unit == "&deg;F" ? "temperature_unit=fahrenheit" : ""
      }&windspeed_unit=mph&start_date=${startDate}&end_date=${endDate}&timezone=Africa%2FCairo`
    )
  ).json();
  // console.log(data);
  temp.innerHTML = `<span>${Math.round(
    data["current_weather"].temperature
  )}</span> <span class="deg">${
    data["current_weather_units"].temperature
  }</span>`;

  if (
    data["current_weather"].weathercode == 0 ||
    data["current_weather"].weathercode == 1
  ) {
    todayImg.src = "./img/Clear.png";
    description.innerHTML = "Clear";
  } else if (data["current_weather"].weathercode == 2) {
    todayImg.src = "./img/LightCloud.png";
    description.innerHTML = "Light Cloud";
  } else if (
    data["current_weather"].weathercode == 3 ||
    data["current_weather"].weathercode == 45 ||
    data["current_weather"].weathercode == 48
  ) {
    todayImg.src = "./img/HeavyCloud.png";
    description.innerHTML = "Heavy Cloud";
  } else if (
    data["current_weather"].weathercode == 55 ||
    data["current_weather"].weathercode == 63 ||
    data["current_weather"].weathercode == 65
  ) {
    todayImg.src = "./img/HeavyRain.png";
    description.innerHTML = "Heavy Rain";
  } else if (
    data["current_weather"].weathercode == 51 ||
    data["current_weather"].weathercode == 53 ||
    data["current_weather"].weathercode == 61
  ) {
    todayImg.src = "./img/LightRain.png";
    description.innerHTML = "Light Rain";
  } else if (
    data["current_weather"].weathercode == 56 ||
    data["current_weather"].weathercode == 57 ||
    data["current_weather"].weathercode == 66 ||
    data["current_weather"].weathercode == 67
  ) {
    todayImg.src = "./img/Sleet.png";
    description.innerHTML = "Sleet";
  } else if (
    data["current_weather"].weathercode == 71 ||
    data["current_weather"].weathercode == 75 ||
    data["current_weather"].weathercode == 73 ||
    data["current_weather"].weathercode == 77
  ) {
    todayImg.src = "./img/Snow.png";
    description.innerHTML = "Snow Fall";
  } else if (
    data["current_weather"].weathercode == 80 ||
    data["current_weather"].weathercode == 81 ||
    data["current_weather"].weathercode == 85 ||
    data["current_weather"].weathercode == 82 ||
    data["current_weather"].weathercode == 86
  ) {
    todayImg.src = "./img/Shower.png";
    description.innerHTML = "Shower";
  } else if (data["current_weather"].weathercode == 95) {
    todayImg.src = "./img/Thunderstorm.png";
    description.innerHTML = "Thunder Storm";
  } else {
    todayImg.src = "./img/Hail.png";
    description.innerHTML = "Hail";
  }

  currentDate.innerHTML = `${todayDate[0]}, ${todayDate[2]} ${todayDate[1]}`;
  curLocation.innerHTML = select.value || "Your Location";
  wind.innerHTML = `${data["current_weather"].windspeed}<span>${data["current_weather_units"].windspeed}</span>`;
  windDirection.style.transform = `rotate(${
    data["current_weather"].winddirection - 45
  }deg)`;

  let humidityData = data.hourly["relativehumidity_2m"];
  humidityData.length = 24;
  let humPrecentage = Math.round(
    humidityData.reduce((acc, el) => acc + el, 0) / 24
  );
  humidity.innerHTML = `${humPrecentage}<span>%</span>`;
  humidityBar.style.width = `${humPrecentage}%`;

  let visibilityData = data.hourly.visibility;
  visibilityData.length = 24;
  visibilityData = Math.round(
    visibilityData.reduce((acc, el) => acc + el, 0) / (24 * 1600)
  );
  visibility.innerHTML = `${visibilityData}<span>miles</span>`;

  let pressureData = data.hourly["surface_pressure"];
  pressureData.length = 24;
  pressureData = Math.round(pressureData.reduce((acc, el) => acc + el, 0) / 24);
  pressure.innerHTML = `${pressureData}<span>mb</span>`;
}

async function daysData() {
  let data = await (
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        select.selectedOptions[0].dataset.lat || yourLocation.latitude
      }&longitude=${
        select.selectedOptions[0].dataset.lon || yourLocation.longitude
      }&hourly=relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&${
        unit == "&deg;F" ? "temperature_unit=fahrenheit" : ""
      }&windspeed_unit=mph&start_date=${startDate}&end_date=${endDate}&timezone=Africa%2FCairo`
    )
  ).json();
  // console.log(data);
  let maxTemp = document.querySelectorAll(".max");
  let minTemp = document.querySelectorAll(".min");
  let imgs = document.querySelectorAll(".day img");

  maxTemp.forEach((el, ind) => {
    el.innerHTML = `${Math.round(
      data.daily["temperature_2m_max"][ind + 1]
    )}${unit}`;
  });
  minTemp.forEach((el, ind) => {
    el.innerHTML = `${Math.round(
      data.daily["temperature_2m_min"][ind + 1]
    )}${unit}`;
  });

  imgs.forEach((el, ind) => {
    if (
      data.daily.weathercode[ind + 1] == 0 ||
      data.daily.weathercode[ind + 1] == 1
    ) {
      el.src = "./img/Clear.png";
    } else if (data.daily.weathercode[ind + 1] == 2) {
      el.src = "./img/LightCloud.png";
    } else if (
      data.daily.weathercode[ind + 1] == 3 ||
      data.daily.weathercode[ind + 1] == 45 ||
      data.daily.weathercode[ind + 1] == 48
    ) {
      el.src = "./img/HeavyCloud.png";
    } else if (
      data.daily.weathercode[ind + 1] == 55 ||
      data.daily.weathercode[ind + 1] == 63 ||
      data.daily.weathercode[ind + 1] == 65
    ) {
      el.src = "./img/HeavyRain.png";
    } else if (
      data.daily.weathercode[ind + 1] == 51 ||
      data.daily.weathercode[ind + 1] == 53 ||
      data.daily.weathercode[ind + 1] == 61
    ) {
      el.src = "./img/LightRain.png";
    } else if (
      data.daily.weathercode[ind + 1] == 56 ||
      data.daily.weathercode[ind + 1] == 57 ||
      data.daily.weathercode[ind + 1] == 66 ||
      data.daily.weathercode[ind + 1] == 67
    ) {
      el.src = "./img/Sleet.png";
    } else if (
      data.daily.weathercode[ind + 1] == 71 ||
      data.daily.weathercode[ind + 1] == 75 ||
      data.daily.weathercode[ind + 1] == 73 ||
      data.daily.weathercode[ind + 1] == 77
    ) {
      el.src = "./img/Snow.png";
    } else if (
      data.daily.weathercode[ind + 1] == 80 ||
      data.daily.weathercode[ind + 1] == 81 ||
      data.daily.weathercode[ind + 1] == 85 ||
      data.daily.weathercode[ind + 1] == 82 ||
      data.daily.weathercode[ind + 1] == 86
    ) {
      el.src = "./img/Shower.png";
    } else if (data.daily.weathercode[ind + 1] == 95) {
      el.src = "./img/Thunderstorm.png";
    } else {
      el.src = "./img/Hail.png";
    }
  });

  let today = new Date();
  let daysDate = document.querySelectorAll(".day .date");
  daysDate.forEach((el, ind) => {
    today.setDate(today.getDate() + 1);
    if (ind != 0) {
      el.innerHTML = handleDates(today);
    } else {
      el.innerHTML = "Tomorrow";
    }
  });
}

select.addEventListener("change", () => {
  locationMenu.style.left = "-100%";
  todayData();
  daysData();
  curLocation.innerHTML = select.value;
});

// Catching The Location In The Search Input
let searchButton = document.querySelector(
  `.location-form input[type="submit"]`
);
let searchInput = document.querySelector(`.location-form input[type="text"]`);
searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (searchInput.value !== "") {
    getCities();
  }
});

feh.addEventListener("click", function (e) {
  e.target.classList.add("activated");
  cel.classList.remove("activated");
  unit = "&deg;F";
  document.querySelector(".deg").innerHTML = unit;
  todayData();
  daysData();
});

cel.addEventListener("click", function (e) {
  e.target.classList.add("activated");
  feh.classList.remove("activated");
  unit = "&deg;C";
  document.querySelector(".deg").innerHTML = unit;
  todayData();
  daysData();
});
