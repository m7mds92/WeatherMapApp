document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM fully loaded ');

    initMap();

    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityName = cityInput.value.trim();
        if(!cityName) return;
        
        try{
            console.log(`Searching coordinates for ${cityName}`);

            const coords = await getCoordinates(cityName);
            console.log('Coordinates found: ', coords);
            map.setView([coords.lat, coords.lon], 10);

            console.log('Fetching weather data');
            const weatherData = await getWeather(coords.lat, coords.lon);
            console.log('Weather data received: ', weatherData);

            const temp = Math.round(weatherData.main.temp);
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const iconCode = weatherData.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const weatherCard =document.getElementById('weather-card');
            weatherCard.classList.remove('hidden');
            weatherCard.innerHTML = `
                <h3>${weatherData.name}<h3>
                <img src="${iconUrl}" alt="${description}">
                <p class="temp">${temp}°C</p>
                <p class="desc">${description}</p>
                <div class="weather-details">
                    <span> Humidity: ${humidity}%</span>
                    <span> Wind Speed: ${windSpeed} m/s</span>
                </div>
            `;
                
            updateMapMarker(coords.lat, coords.lon, `<strong>${weatherData.name}</strong><br>${temp}°C, ${description}`);
            
        } catch(error){
            console.error('Error:', error.message);
            alert(error.message);
        }
    });
});