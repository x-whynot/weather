const apiKey = '7b7dbcab5d8f43b49da135742240209'; // Ваш API ключ для WeatherAPI
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function getWeather(city) {
    fetch(`${apiUrl}${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('description').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} kph`;

    const iconUrl = `https:${data.current.condition.icon}`;
    document.getElementById('weather-icon').src = iconUrl;

    document.getElementById('weather-display').classList.remove('hidden');
}

