document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM fully loaded ');

    initMap();

    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const cityName = cityInput.value.trim();
        if(!cityName) return;
        
        const weatherCard =document.getElementById('weather-card');

        try{
            weatherCard.classList.remove('hidden');
            weatherCard.innerHTML= `
                <div class="loading-state" style="text-align: center; padding: 20px;">
                    <p>Searching for <strong>${cityName}</strong>...</p>
                </div>
            `;

            // console.log(`Searching coordinates for ${cityName}`);

            const coords = await getCoordinates(cityName);
            // console.log('Coordinates found: ', coords);
            map.setView([coords.lat, coords.lon], 10);

            weatherCard.innerHTML = `
            <div class="loading-state" style="text-align: center; padding: 20px;">
                <p>Fetching weather data...</p>
            </div>
        `;
            console.log('Fetching weather data');
            const weatherData = await getWeather(coords.lat, coords.lon);
            console.log('Weather data received: ', weatherData);

            const temp = Math.round(weatherData.main.temp);
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const iconCode = weatherData.weather[0].icon;
            const weatherEmoji = getWeatherEmoji(iconCode);

            weatherCard.classList.remove('hidden');
            weatherCard.innerHTML = `
                <h3>${weatherData.name}</h3>
                <div class="weather-icon-emoji" style="font-size: 3rem; margin: 10px 0;">${weatherEmoji}</div>
                <p class="temp">${temp}°C</p>
                <p class="desc">${description}</p>
                <div class="weather-details">
                    <span> Humidity: ${humidity}%</span>
                    <span> Wind Speed: ${windSpeed} m/s</span>
                </div>
                <button id="share-btn" 
                    style="background-color: #2ecc71;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    transition: background-color 0.3s ease;">
                Share Weather 📤
            </button>
            `;
        
            

        function getWeatherEmoji(iconCode) {
            const iconMap = {
            '01d': '☀️', // clear sky day
            '01n': '🌙', // clear sky night
            '02d': '⛅', // few clouds day
            '02n': '☁️', // few clouds night
            '03d': '☁️', // scattered clouds
            '03n': '☁️', 
            '04d': '☁️', // broken clouds
            '04n': '☁️', 
            '09d': '🌧️', // shower rain
            '09n': '🌧️', 
            '10d': '🌦️', // rain day
            '10n': '🌧️', // rain night
            '11d': '⚡', // thunderstorm
            '11n': '⚡', 
            '13d': '❄️', // snow
            '13n': '❄️', 
            '50d': '🌫️', // mist
            '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌈'; // Default fallback emoji
}
            updateMapMarker(coords.lat, coords.lon, `<strong>${weatherData.name}</strong><br>${temp}°C, ${description}`);
            
        } catch(error){
            console.error('Error:', error.message);

            weatherCard.classList.remove('hidden');
            weatherCard.innerHTML = `
            <div class="error-banner" style="color: #d9534f; background-color: #f9d6d5; padding: 15px; border-radius: 5px; text-align: center;">
                <p><strong>Error:</strong> ${error.message}</p>
            </div>
        `;
        }
    
    });

    const weatherCard = document.getElementById('weather-card');

// Event delegation: listen for clicks inside the weather card container
weatherCard.addEventListener('click', async (event) => {
    if (event.target && event.target.id === 'share-btn') {
        const cityName = event.target.dataset.name;
        const temp = event.target.dataset.temp;
        const desc = event.target.dataset.desc;
        const wind = event.target.dataset.wind;
        const humidity = event.target.dataset.humidity;

        const shareText = `Current weather in ${cityName}: ${temp}°C, ${desc}. Wind: ${wind} m/s, Humidity: ${humidity}%.`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Weather in ${cityName}`,
                    text: shareText
                });
            } else {
                await navigator.clipboard.writeText(shareText);
                alert('Weather summary copied to clipboard!');
            }
        } catch (err) {
            console.log('Share canceled or failed:', err);
        }
    }
});
    

});