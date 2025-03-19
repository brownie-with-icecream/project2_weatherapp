const apiKey = "ad44533f2a63421d86d153424251903"; // Your WeatherAPI Key
const baseUrl = "http://api.weatherapi.com/v1"; // API Base URL
const endpoint = "/forecast.json"; // API Endpoint
const days = 7; // Always fetch 7 days of data

// 🌍 Fetch Weather Data
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const tableBody = document.getElementById("weatherTableBody");

    // Clear previous data
    tableBody.innerHTML = "";

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    // Construct API URL
    const url = `${baseUrl}${endpoint}?key=${apiKey}&q=${city}&days=${days}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Error handling for invalid city
        if (data.error) {
            alert("City not found! Please enter a valid city.");
            return;
        }

        // Populate the table with forecast data
        data.forecast.forecastday.forEach(day => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${day.date}</td>
                <td>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                    ${day.day.condition.text}
                </td>
                <td>${day.day.maxtemp_c}°C</td>
                <td>${day.day.mintemp_c}°C</td>
                <td>${day.day.avgtemp_c}°C</td>
                <td>${day.day.avghumidity}%</td>
                <td>${day.day.maxwind_kph} kph</td>
                <td>${day.day.daily_chance_of_rain}%</td>
                <td>${day.astro.sunrise}</td>
                <td>${day.astro.sunset}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Something went wrong. Please try again later.");
    }
}

// 🌙 Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // Toggle Dark Mode on Switch Click
    toggleSwitch.addEventListener("change", function () {
        if (this.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled"); // Save preference
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled"); // Save preference
        }
    });
});
