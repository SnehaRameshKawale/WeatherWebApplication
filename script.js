/*setting the time  */
setInterval(() => {
    const time = document.querySelector("#showtime");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if (hours > 12) {
        day_night = "PM";
        hours = hours - 12;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    time.textContent = hours + ":" + +minutes + ":" + seconds + " " + day_night;
});
/*show current day and date */
let day = "Sunday";

switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thuesday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}
document.getElementById("day").innerHTML = day + ",";

/*date */
let date = new Date();
let monthdate = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
document.getElementById("showdate").innerHTML = monthdate + "-" + month + "-" + year + " ";

/*show city and country deafult */
const city = document.getElementById("cityname");
const country = document.getElementById("countryname");
const temp = document.getElementById("showdegrre");
const weather = document.getElementById("weathercondition");
const city2 = document.getElementById("city2name");
const country2 = document.getElementById("countr2yname");
const temp2 = document.getElementById("showtemprature");
const hummadity = document.getElementById("showhumaditiy");
const windspeed = document.getElementById("showwindspeed");
const visibility = document.getElementById("showvisibility");

async function getDataByLocation(lat, lag) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=8e6415ab05e2479d80a142346232509&q=${lat},${lag}&aqi=yes`
    );
    return await promise.json();
}

/*How to fech lagnitude and latutude */
function getLocation() {
    /* alert("allow to access your location")*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Error while accessing your location");
    }
}
async function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    const getresult = await getDataByLocation(position.coords.latitude, position.coords.longitude);
    console.log(getresult);
    /*Displaying the current deafult location info*/
    city.innerHTML = `${getresult.location.region}`
    country.innerHTML = `${getresult.location.country}`
    temp.innerHTML = `${getresult.current.temp_c}`
    weather.innerHTML = `${getresult.current.condition.text}`
    city2.innerHTML = `${getresult.location.region}`
    country2.innerHTML = `${getresult.location.country}`
    temp2.innerHTML = `${getresult.current.temp_c}`
    hummadity.innerHTML = `${getresult.current.humidity}`
    windspeed.innerHTML = `${getresult.current.wind_kph}`
    visibility.innerHTML = `${getresult.current.vis_km}`

    /*check conditions to chnage images */
    const weather2 = weather.innerHTML;
    console.log(weather2);

    const txt = "Moderate or heavy rain shower";
    const txt1 = "Sunny";
    const txt2 = "Partly cloudy";
    const txt3 = "Haze";
    const txt4 = "Mist";

    if (weather2 == txt) {
        document.getElementById("sunemoji").src = "./pictures/heavy-rain.png";
    } else if (weather2 == txt1) {
        document.getElementById("sunemoji").src = "./pictures/Sunny.png";
    } else if (weather2 == txt2) {
        document.getElementById("sunemoji").src = "./pictures/partly-cloudy.png";
    } else if (weather2 == txt3) {
        document.getElementById("sunemoji").src = "./pictures/mist_haze.png";
    } else if (weather2 == txt4) {
        document.getElementById("sunemoji").src = "./pictures/mist .png";
    } else {
        const imgg = document.getElementById("sunemoji");
        imgg.innerHTML = `${getresult.current.condition.icon}`
    }
    console.log("Successfull_img");
}

/*now search weather */
const inputvalue = document.getElementById("seacrh");
const seacrhbt = document.getElementById("searchbt");

async function getData(cityname) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=8e6415ab05e2479d80a142346232509&q=${cityname}&aqi=yes`
    );
    return await promise.json();
}

seacrhbt.addEventListener("click", async () => {
    const value = inputvalue.value;
    try {
        const result = await getData(value);
        console.log(result);
        weather.innerHTML = `${result.current.condition.text}`
        checkweather(weather.innerHTML);
        city2.innerHTML = `${result.location.name}`
        country2.innerHTML = `${result.location.country}`
        temp2.innerHTML = `${result.current.temp_c}`
        hummadity.innerHTML = `${result.current.humidity}`
        windspeed.innerHTML = `${result.current.wind_kph}`
        visibility.innerHTML = `${result.current.vis_km}`

    } catch (err) {
        alert("Please enter write country name");
    }

    /*for emoji */
    function checkweather(weather2) {
        // let weather2 = weather.innerHTML ;
        console.log(weather2);

        const tx = "Moderate or heavy rain shower";
        const tx1 = "Sunny";
        const tx2 = "Partly cloudy";
        const tx3 = "Haze";
        const tx4 = "Mist";
        const tx5 = "Clear";

        if (weather2 == tx) {
            document.getElementById("sunemoji").src = "./pictures/heavy-rain.png";
        } else if (weather2 == tx1) {
            document.getElementById("sunemoji").src = "./pictures/Sunny.png";
        } else if (weather2 == tx2 || weather2==tx5) {
            document.getElementById("sunemoji").src = "./pictures/partly-cloudy.png";
        } else if (weather2 == tx3) {
            document.getElementById("sunemoji").src = "./pictures/mist_haze.png";
        } else if (weather2 == tx4) {
            document.getElementById("sunemoji").src = "./pictures/mist .png";
        } else {
            document.getElementById("sunemoji").src = "./pictures/weathertext.png";
        }
        console.log("Successfull_img");
    }
});