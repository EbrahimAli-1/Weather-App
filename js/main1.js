// https://api.openweathermap.org/data/2.5/weather?q={city%20name}&appid=aafdd5d4685837495278cc568ba24650

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

// Catching The Location In The Search Input
let searchButton = document.querySelector(
  `.location-form input[type="submit"]`
);
let searchInput = document.querySelector(`.location-form input[type="text"]`);
searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (searchInput.value !== "") {
    checkWeather(searchInput.value);

    locationMenu.style.left = "-100%";
  }
});

// Getting The Current Location of The User Using GPS
let yourLocation = {};
navigator.geolocation.getCurrentPosition((p) => {
  yourLocation = p.coords;

  geolocation(yourLocation.latitude, yourLocation.longitude);
});

// Using All The Data of The Location To make The Website Dynamic
let temp = document.querySelector(".temp span");
let description = document.querySelector(".details .date h3");
let start_date = new Date();
let todayDate = start_date.toString().split(" ");
let currentDate = document.querySelector(".p1 .date-time");
let curLocation = document.querySelector(".details .date .p2 .loc");
let wind = document.querySelector(".highlight-box .wind p");
let humidity = document.querySelector(".highlight-box .humidity p");
let visibility = document.querySelector(".highlight-box .visibility p");
let pressure = document.querySelector(".highlight-box .pressure p");
let nxtDays = document.querySelector(".main .days");

async function geolocation(lat, lon) {
  let data = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=aafdd5d4685837495278cc568ba24650`
    )
  ).json();
  console.log(data);
  temp.innerHTML = Math.round(data.list[0].main.temp);
  description.innerHTML = data.list[0].weather[0].description;
  currentDate.innerHTML = `${todayDate[0]}, ${todayDate[2]} ${todayDate[1]}`;
  curLocation.innerHTML = "Your Location";

  wind.innerHTML = data.list[0].wind.speed + "<span>mph</span>";
  humidity.innerHTML = data.list[0].main.humidity + "<span>%</span>";
  // visibility.innerHTML = visibilityData + "<span>mph</span>";
  pressure.innerHTML = data.list[0].main.pressure + "<span>mb</span>";
  // let visibilityData = data.visibility / (24 * 1600);
  // console.log(visibilityData);

  let days = document.querySelector("div.days");
  days.innerHTML = "";
  let today = data.list[0].dt_txt.split(" ")[0].split("-")[2];
  let daysArr = data.list;
  daysArr.map(function (ele, ind) {
    let day = ele.dt_txt.split(" ")[0].split("-")[2];
    if (day > today) {
      today = day;
      // console.log(today);
      let dayName = new Date(ele.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      // console.log(dayName);
      // console.log(ele);

      let days = document.createElement("div");
      days.className = "day";
      let dayDate = document.createElement("div");
      dayDate.className = "date";
      dayDate.innerHTML = dayName;
      // console.log(dayDate);
      let dayImg = document.createElement("img");
      dayImg.src = "./img/HeavyCloud.png";
      let dergees = document.createElement("div");
      dergees.className = "degrees";
      let max = document.createElement("div");
      max.className = "max";
      max.innerHTML = Math.round(ele.main.temp_max) + "&deg;C";
      let min = document.createElement("div");
      min.className = "min";
      min.innerHTML = Math.round(ele.main.temp_max) + "&deg;C";

      dergees.appendChild(max);
      dergees.appendChild(min);
      days.appendChild(dayDate);
      days.appendChild(dayImg);
      days.appendChild(dergees);
      nxtDays.appendChild(days);
    }
  });
  let nxtDay = document.querySelector(".days .day .date");
  nxtDay.innerHTML = "Tomorrow";
  // console.log(nxtDay);
}

async function checkWeather(city) {
  let data = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=aafdd5d4685837495278cc568ba24650`
    )
  ).json();
  console.log(data);

  temp.innerHTML = Math.round(data.list[0].main.temp);
  description.innerHTML = data.list[0].weather[0].description;
  currentDate.innerHTML = `${todayDate[0]}, ${todayDate[2]} ${todayDate[1]}`;
  curLocation.innerHTML = data.city.name;
  wind.innerHTML = data.list[0].wind.speed + "<span>mph</span>";
  humidity.innerHTML = data.list[0].main.humidity + "<span>%</span>";
  // visibility.innerHTML = visibilityData + "<span>mph</span>";
  pressure.innerHTML = data.list[0].main.pressure + "<span>mb</span>";
  // let visibilityData = data.visibility / (24 * 1600);
  // console.log(visibilityData);

  let days = document.querySelector("div.days");
  days.innerHTML = "";
  let today = data.list[0].dt_txt.split(" ")[0].split("-")[2];
  let daysArr = data.list;
  daysArr.map(function (ele, ind) {
    let day = ele.dt_txt.split(" ")[0].split("-")[2];
    if (day > today) {
      today = day;
      // console.log(today);
      let dayName = new Date(ele.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      // console.log(dayName);
      // console.log(ele);

      let days = document.createElement("div");
      days.className = "day";
      let dayDate = document.createElement("div");
      dayDate.className = "date";
      dayDate.innerHTML = dayName;
      // console.log(dayDate);
      let dayImg = document.createElement("img");
      dayImg.src = "./img/HeavyCloud.png";
      let dergees = document.createElement("div");
      dergees.className = "degrees";
      let max = document.createElement("div");
      max.className = "max";
      max.innerHTML = Math.round(ele.main.temp_max) + "&deg;C";
      let min = document.createElement("div");
      min.className = "min";
      min.innerHTML = Math.round(ele.main.temp_max) + "&deg;C";

      dergees.appendChild(max);
      dergees.appendChild(min);
      days.appendChild(dayDate);
      days.appendChild(dayImg);
      days.appendChild(dergees);
      nxtDays.appendChild(days);
    }
  });
  let nxtDay = document.querySelector(".days .day .date");
  nxtDay.innerHTML = "Tomorrow";
  // console.log(nxtDay);
}

// let unit = "&deg;C";
// let end_date = new Date();
// const feh = document.querySelector(".feh");
// const cel = document.querySelector(".cel");

// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================
// =================================================================================================

// const startDate = start_date.toLocaleString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
//     .split("/").reverse().map(handleDate).join("-")
// const endDate = end_date.toLocaleString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
//     .split("/").reverse().map(handleDate).join("-")

//     console.log(startDate);
//     console.log(endDate);

//     function handleDates(date) {
//       return `${date.toLocaleString("en-US", { dateStyle: "full" }).substr(0, 3)},${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`
//   }

// const select = document.querySelector("#cities")

// async function getCities() {
//     const cities = await (await fetch("https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json")).json()
//     let modCities = cities.filter(el => el.name.toLowerCase().startsWith(citySearch.value)).sort((a, b) => a.name > b.name ? 1 : -1).map(el => {
//         return `<option data-lat="${el.lat}" data-lon="${el.lon}" value="${el.name} "${el.country.toLowerCase()}"">${el.name} "${el.country.toLowerCase()}"</option>`
//     })
//     modCities.length = 50
//     select.innerHTML = `${yourLocation.longitude && "<option value='Your Location'>Your Location</option>"}${modCities.join("")}`

//     currentLoc.textContent = select.value
//     updateDates()
//     updateTodayData()
//     updateNextDaysData()

// }

// function updateDates() {
//     const today = new Date()
//     const todayDateEl = document.querySelector(".date-str")
//     const nextDaysDate = document.querySelectorAll(".day-data .date")
//     const todayString = handleDates(today)
//     todayDateEl.textContent = todayString
//     nextDaysDate.forEach((el, ind) => {
//         today.setDate(today.getDate() + 1)
//         if (ind != 0) {
//             el.textContent = handleDates(today)
//         }
//     })
// }
// async function updateTodayData() {
//     const api = `https://api.open-meteo.com/v1/forecast?latitude=${select.selectedOptions[0].dataset.lat || yourLocation.latitude}&longitude=${select.selectedOptions[0].dataset.lon || yourLocation.longitude}&hourly=relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&${unit == "&deg;F" ? "temperature_unit=fahrenheit" : ""}&windspeed_unit=mph&start_date=${startDate}&end_date=${endDate}&timezone=Africa%2FCairo`
//     const weatherData = await (await fetch(api)).json()
//     const todayTemp = document.querySelector(".temp :first-child")
//     todayTemp.textContent = `${Math.trunc(weatherData["current_weather"].temperature)}`
//     const todayImg = document.querySelector(".todays-weather-img")
//     const todayCond = document.querySelector(".cond")
//     if (weatherData["current_weather"].weathercode == 0 || weatherData["current_weather"].weathercode == 1) {
//         todayImg.src = "./images/Clear.png"
//         todayCond.textContent = "Clear"
//     } else if (weatherData["current_weather"].weathercode == 2) {
//         todayImg.src = "./images/LightCloud.png"
//         todayCond.textContent = "Light Cloud"
//     } else if (weatherData["current_weather"].weathercode == 3 || weatherData["current_weather"].weathercode == 45 || weatherData["current_weather"].weathercode == 48) {
//         todayImg.src = "./images/HeavyCloud.png"
//         todayCond.textContent = "Heavy Cloud"
//     } else if (weatherData["current_weather"].weathercode == 55 || weatherData["current_weather"].weathercode == 63 || weatherData["current_weather"].weathercode == 65) {
//         todayImg.src = "./images/HeavyRain.png"
//         todayCond.textContent = "Heavy Rain"
//     } else if (weatherData["current_weather"].weathercode == 51 || weatherData["current_weather"].weathercode == 53 || weatherData["current_weather"].weathercode == 61) {
//         todayImg.src = "./images/LightRain.png"
//         todayCond.textContent = "Light Rain"
//     } else if (weatherData["current_weather"].weathercode == 56 || weatherData["current_weather"].weathercode == 57 || weatherData["current_weather"].weathercode == 66 || weatherData["current_weather"].weathercode == 67) {
//         todayImg.src = "./images/Sleet.png"
//         todayCond.textContent = "Sleet"
//     } else if (weatherData["current_weather"].weathercode == 71 || weatherData["current_weather"].weathercode == 75 || weatherData["current_weather"].weathercode == 73 || weatherData["current_weather"].weathercode == 77) {
//         todayImg.src = "./images/Snow.png"
//         todayCond.textContent = "Snow Fall"
//     } else if (weatherData["current_weather"].weathercode == 80 || weatherData["current_weather"].weathercode == 81 || weatherData["current_weather"].weathercode == 85 || weatherData["current_weather"].weathercode == 82 || weatherData["current_weather"].weathercode == 86) {
//         todayImg.src = "./images/Shower.png"
//         todayCond.textContent = "Shower"
//     } else if (weatherData["current_weather"].weathercode == 95) {
//         todayImg.src = "./images/Thunderstorm.png"
//         todayCond.textContent = "Thunder Storm"
//     } else {
//         todayImg.src = "./images/Hail.png"
//         todayCond.textContent = "Hail"
//     }
//     const windSpeed = document.querySelector(".wind p")
//     const winddir = document.querySelector(".wind .dir span")
//     windSpeed.textContent = `${weatherData["current_weather"].windspeed}mph`
//     winddir.style.transform = `rotate(${weatherData["current_weather"].winddirection - 45}deg)`
//     let humidityData = structuredClone(weatherData.hourly["relativehumidity_2m"])
//     humidityData.length = 24
//     let humPrecentage = Math.round(humidityData.reduce((acc, el) => acc + el, 0) / 24)
//     const humidityValue = document.querySelector(".humidity p")
//     humidityValue.textContent = `${humPrecentage}%`
//     const humbar = document.querySelector(".humidity .value span")
//     humbar.style.width = `${humPrecentage}%`
//     let visibilityData = structuredClone(weatherData.hourly.visibility)
//     visibilityData.length = 24
//     visibilityData = Math.round(visibilityData.reduce((acc, el) => acc + el, 0) / (24 * 1600))
//     const visibilityTxt = document.querySelector(".visibility p")
//     visibilityTxt.textContent = `${visibilityData} miles`
//     let pressData = structuredClone(weatherData.hourly["surface_pressure"])
//     pressData.length = 24
//     pressData = Math.round(pressData.reduce((acc, el) => acc + el, 0) / 24)
//     const pressTxt = document.querySelector(".airpress p")
//     pressTxt.textContent = `${pressData} mb`

// }
// async function updateNextDaysData() {

//     const api = `https://api.open-meteo.com/v1/forecast?latitude=${select.selectedOptions[0].dataset.lat || 30.9}&longitude=${select.selectedOptions[0].dataset.lon || 31.59}&hourly=relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&${unit == "&deg;F" ? "temperature_unit=fahrenheit" : ""}&windspeed_unit=mph&start_date=${startDate}&end_date=${endDate}&timezone=Africa%2FCairo`
//     const { daily: weatherData } = await (await fetch(api)).json()
//     const maxTemp = document.querySelectorAll(".max")
//     const minTemp = document.querySelectorAll(".min")
//     const dayImg = document.querySelectorAll(".day-data img")
//     maxTemp.forEach((el, ind) => {
//         el.innerHTML = `${Math.round(weatherData["temperature_2m_max"][ind + 1])}${unit}`
//     })
//     minTemp.forEach((el, ind) => {
//         el.innerHTML = `${Math.round(weatherData["temperature_2m_min"][ind + 1])}${unit}`
//     })
//     dayImg.forEach((el, ind) => {
//         if (weatherData.weathercode[ind + 1] == 0 || weatherData.weathercode[ind + 1] == 1) {
//             el.src = "./images/Clear.png"
//         } else if (weatherData.weathercode[ind + 1] == 2) {
//             el.src = "./images/LightCloud.png"
//         } else if (weatherData.weathercode[ind + 1] == 3 || weatherData.weathercode[ind + 1] == 45 || weatherData.weathercode[ind + 1] == 48) {
//             el.src = "./images/HeavyCloud.png"
//         } else if (weatherData.weathercode[ind + 1] == 55 || weatherData.weathercode[ind + 1] == 63 || weatherData.weathercode[ind + 1] == 65) {
//             el.src = "./images/HeavyRain.png"
//         } else if (weatherData.weathercode[ind + 1] == 51 || weatherData.weathercode[ind + 1] == 53 || weatherData.weathercode[ind + 1] == 61) {
//             el.src = "./images/LightRain.png"
//         } else if (weatherData.weathercode[ind + 1] == 56 || weatherData.weathercode[ind + 1] == 57 || weatherData.weathercode[ind + 1] == 66 || weatherData.weathercode[ind + 1] == 67) {
//             el.src = "./images/Sleet.png"
//         } else if (weatherData.weathercode[ind + 1] == 71 || weatherData.weathercode[ind + 1] == 75 || weatherData.weathercode[ind + 1] == 73 || weatherData.weathercode[ind + 1] == 77) {
//             el.src = "./images/Snow.png"
//         } else if (weatherData.weathercode[ind + 1] == 80 || weatherData.weathercode[ind + 1] == 81 || weatherData.weathercode[ind + 1] == 85 || weatherData.weathercode[ind + 1] == 82 || weatherData.weathercode[ind + 1] == 86) {
//             el.src = "./images/Shower.png"
//         } else if (weatherData.weathercode[ind + 1] == 95) {
//             el.src = "./images/Thunderstorm.png"
//         } else {
//             el.src = "./images/Hail.png"
//         }
//     })
// }

// feh.addEventListener("click", function () {
//     this.classList.add("activated")
//     cel.classList.remove("activated")
//     unit = "&deg;F"
//     document.querySelector(".deg").innerHTML = unit
//     updateDates()
//     updateTodayData()
//     updateNextDaysData()

// })
// cel.addEventListener("click", function () {
//     this.classList.add("activated")
//     feh.classList.remove("activated")
//     unit = "&deg;C"
//     document.querySelector(".deg").innerHTML = unit
//     updateDates()
//     updateTodayData()
//     updateNextDaysData()

// })
