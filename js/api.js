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