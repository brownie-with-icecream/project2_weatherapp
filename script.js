async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    
    const apiKey = "ad44533f2a63421d86d153424251903";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            document.getElementById("weatherResult").innerHTML = `<p>${data.error.message}</p>`;
        } else {
            document.getElementById("weatherResult").innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather Icon">
            `;
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data</p>`;
    }
}
