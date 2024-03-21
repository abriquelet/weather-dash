const apiKey = '0f155a46c630bcfc919257e207d8ff73';

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Filter for noon forecasts
            displayForecast(city, forecastData);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}

function displayForecast(city, forecastData) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.classList.remove('hidden');

    const forecastList = weatherDisplay.querySelector('ul');
    forecastList.innerHTML = ''; 

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        const temperature = item.main.temp;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h2>${city}</h2>
            <p>${dayOfWeek}</p>
            <img src="${icon}" alt="Weather Icon">
            <p>Temperature: ${temperature} °F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} mph</p>
        `;
        forecastList.appendChild(listItem);
    });
}

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('searchInput').value;
    if (city.trim() !== '') {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Hide li elements initially
const liElements = document.querySelectorAll('.day-forecast');
liElements.forEach(li => {
    li.classList.add('hidden');
});