const btn = document.getElementById("btn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const result = document.getElementById("result");
const cityInput = document.getElementById("city");

const API_KEY = "415ef268356f0afdfaac6c2d6de242b9"; 

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    result.textContent = "Please enter a city name";
    return;
  }

  try {
    btn.disabled = true;
    spinner.style.display = "inline-block";
    btnText.textContent = "Loading...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    result.innerHTML = `
      <h3>${data.name}</h3>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
    `;

  } catch (error) {
    result.textContent = error.message;
  } finally {
    spinner.style.display = "none";
    btnText.textContent = "Get Weather";
    btn.disabled = false;
  }
}

btn.addEventListener("click", getWeather);
