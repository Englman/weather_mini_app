const container = document.querySelector('.container');
const search = document.querySelector('.search_box button');
const weatherBox = document.querySelector('.weather_box');
const weatherDetails = document.querySelector('.weather_details');
const error = document.querySelector(".not_found");
const input = document.querySelector(".search_box input");
const cityName = document.querySelector(".city_name");


function getWeather(){
    const APIkey = 'c293b79e533d9ed7917bad0f799964b8';
    const city = document.querySelector(".search_box input").value;

    if(city == ''){
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error.classList.add('active');
        document.querySelector(".not_found p").innerHTML = "You've entered nothing!"; 
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(data => {
        if(data.cod == '404'){
            cityName.textContent = city;
            container.style.height = "400px";
            weatherBox.classList.remove("active");
            weatherDetails.classList.remove("active");
            error.classList.add('active');
            document.querySelector(".not_found p").innerHTML = "Location not found!";
            return;
        }

        const image = document.querySelector(".weather_box img");
        const temperature = document.querySelector(".weather_box .temperature");
        const description = document.querySelector(".weather_box .description");
        const humidity = document.querySelector(".weather_details .humidity span");
        const wind = document.querySelector(".weather_details .wind span");

        if(cityName.textContent == city){
            return;
        }else{
            cityName.textContent = city;

            container.style.height = "555px";
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error.classList.remove('active');

            switch(data.weather[0].main){
            case 'Rain':
                image.src = "imgs/rain.png";
                break;
            case 'Snow':
                image.src = "imgs/snow.png";
                break;
            case 'Mist':
                image.src = "imgs/mist.png";
                break;
            case 'Haze':
                image.src = "imgs/mist.png";
                break;
            case 'Clouds':
                image.src = "imgs/cloud.png";
                break;
            case 'Clear':
                image.src = "imgs/clear.png";
                break;
            default:
                image.src = 'imgs/cloud.png';
                break;
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°c</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
        wind.innerHTML = `${parseInt(data.wind.speed)}<span>Km/h</span>`;
        }
    })
}

search.addEventListener('click', getWeather);
input.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        getWeather();
    }
})