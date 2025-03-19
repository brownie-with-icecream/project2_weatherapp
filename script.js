const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherCard = document.getElementById("weatherCard");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found! Try another one.");
                return;
            }

            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temperature").textContent = `🌡️ ${data.main.temp}°C`;
            document.getElementById("weatherDescription").textContent = `☁️ ${data.weather[0].description}`;

            // Set weather icon
            const iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Show the weather card with animation
            weatherCard.style.display = "block";
            weatherCard.style.opacity = "0";
            setTimeout(() => {
                weatherCard.style.opacity = "1";
            }, 100); // Smooth fade-in effect
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Something went wrong. Try again later!");
        });
}
