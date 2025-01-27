const cityName = document.getElementById("cityName");
const card = document.getElementById("stats")
const apiKey = "ae024d7500f30d0d33c1c7cccb828bf2";
const weatherForm = document.querySelector(".weatherForm");

weatherForm.addEventListener("submit",async (event) => {
    event.preventDefault();
    const city=cityName.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        errorDisplay("Please enter a city name");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){   
        throw new Error("Could not find the city");

    }
    return await response.json();

}

function displayWeatherData(data){
console.log(data);
const {name:city , main:{temp,humidity}, weather: [{description,id}]} = data;
card.textContent="";
card.style.display = "flex";    
const cityDisplay = document.createElement("h1");
const tempDisplay = document.createElement("p");
const descDisplay = document.createElement("p");
const humidityDisplay = document.createElement("p");
const weatherEmoji = document.createElement("p");

cityDisplay.textContent = city;
tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descDisplay.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);

cityDisplay.classList.add("cityDisplay")
tempDisplay.classList.add("tempDisplay")
humidityDisplay.classList.add("humidityDisplay");
descDisplay.classList.add("descDisplay");
weatherEmoji.classList.add("weatherEmoji")


card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);

}

function getWeatherEmoji(id){

        switch(true){
            case (id>=200 && id<300):
                return "⛈️";
            case (id>=300 && id<600):
                return "🌧️";
            case (id>=700 && id<800):
                return "🌫️";
            case (id===800):
                return "☀️";
            case (id>=801 && id<810):
                return "☁️";
            default:
                return "❓";


        }
}


function errorDisplay(message){
    card.textContent="";
    const errorMessage=document.createElement("p");
    errorMessage.textContent=message;
    card.style.display = "block";
    errorMessage.classList.add("errorDisplay");
    card.appendChild(errorMessage);
    
}
