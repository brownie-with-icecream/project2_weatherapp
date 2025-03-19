const apiKey = "ad44533f2a63421d86d153424251903"; // Your WeatherAPI Key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherCard = document.getElementById("weatherCard");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = data.location.name;
            document.getElementById("temperature").textContent = `🌡️ ${data.current.temp_c}°C`;
            document.getElementById("weatherDescription").textContent = `☁️ ${data.current.condition.text}`;

            // Set weather icon
            document.getElementById("weatherIcon").src = data.current.condition.icon;

            // Show the weather card with animation
            weatherCard.style.display = "block";
            weatherCard.style.opacity = "0";
            setTimeout(() => {
                weatherCard.style.opacity = "1";
            }, 100); // Smooth fade-in effect
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("City not found! Try another one.");
        });
}
