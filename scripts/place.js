const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}


// Static Weather Values
const temperature = 5;   // °C
const windSpeed = 20;     // km/h

document.querySelector("#temperature").textContent = temperature;
document.querySelector("#windspeed").textContent = windSpeed;


// Wind Chill Calculation Function
// Metric Formula (°C, km/h)
function calculateWindChill(tempC, windSpeedKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(windSpeedKmh, 0.16) +
    0.3965 * tempC * Math.pow(windSpeedKmh, 0.16)
  ).toFixed(1);
}


// Apply Wind Chill Conditions
const windChillSpan = document.querySelector("#windchill");

if (temperature <= 10 && windSpeed > 4.8) {
  windChillSpan.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillSpan.textContent = "N/A";
}