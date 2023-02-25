const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        getData();
    }
})

search.addEventListener('click', () => {

        getData();
});


const getData = async function () {
    const APIKey = 'ce305882d8d3562123b8d51ea36689ac';
    const city = document.querySelector('.search-box input').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const data = await response.json();
    console.log(data);

    if (data.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const searchResult = document.querySelector('.city');
    let translateWeather = '';

    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            translateWeather = 'Limpo';
            break;

        case 'Rain':
            image.src = 'images/rain.png';
            translateWeather = 'Chuva';
            break;

        case 'Snow':
            image.src = 'images/snow.png';
            translateWeather = 'Neve';
            break;

        case 'Clouds':
            image.src = 'images/cloud.png';
            translateWeather = 'Nublado';
            break;

        case 'Haze':
            image.src = 'images/mist.png';
            translateWeather = 'Ventânia';
            break;

        default:
            image.src = '';
    }


    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = translateWeather;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
    searchResult.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}