const OPENWEATHER_API_KEY = 'b98954fbe8a26cfb88fcca2f463be0e6'; 
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
/**
 * @param {string} cityName 
 * @returns {Promise<{lat: number, lon: number, displayName: string}>}
 */

async function getCoordinates(cityname){
    const url =`${NOMINATIM_URL}?format=json&q=${encodeURIComponent(cityname)}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Failed to fetch coordinates');
    }

    const data = await response.json();
    if(!data || data.length === 0){
        throw new Error('City not found');
    }
    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name
    };
}


/**
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */

async function getWeather(lat, lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
}