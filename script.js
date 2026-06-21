const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

function displayWeather(data) {
    cityEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `🌡 Temperature: ${data.main.temp} °C`;
    descEl.textContent = `☁ Condition: ${data.weather[0].description}`;
    humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;
    windEl.textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
}

async function getWeatherByCity(city) {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        alert(error.message);
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        alert("Unable to fetch weather data.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeatherByCity(city);
    }
});

locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByCoords(lat, lon);
        },
        () => {
            alert("Unable to retrieve your location.");
        }
    );
});
