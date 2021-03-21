const citiWeatherContainer = document.querySelector(".current-weather"),
  cityDisplay = citiWeatherContainer.querySelector(".current-location"),
  tempDisplay = citiWeatherContainer.querySelector(".current-tem"),
  skyDisplay = citiWeatherContainer.querySelector(".current-sky"),
  locationError = citiWeatherContainer.querySelector(".access-error");

const COORDS = "coords",
  API_KEY = "27367b2eb2f00db5a8a1e6b5cb618646";

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(
    function(response){
    return response.json()
    }
  ).then(
    function(json){
      const currentCity = json.name,
        currentTemp = Math.floor(json.main.temp),
        currentWeather = json.weather[0].main;
      
      cityDisplay.innerText = currentCity
      tempDisplay.innerText = `${currentTemp} ˚`

      if(currentWeather === "Clouds"){ //날씨가 흐릴 때 
        skyDisplay.innerText = "☁️"
      } else if(currentWeather === "Thunderstorm"){ //날씨가 천둥번개일 때 
        skyDisplay.innerText = "⛈"
      } else if(currentWeather === "Drizzle"){ //날씨가 부슬비 때 
        skyDisplay.innerText = "🌦"
      } else if(currentWeather === "Rain"){ //날씨가 비 내랄 때 
        skyDisplay.innerText = "🌧"
      } else if(currentWeather === "Snow"){ // 날씨가 눈 내릴 때
        skyDisplay.innerText = "❄️"
      } else if(currentWeather === "Clear"){ //날씨가 화찰할 때
        skyDisplay.innerText = "☀️"
      } 
        // 애니메이션
      if(skyDisplay.innerText !== ""){
        showAnimation();
      } 
    }
  )
}

function handleGeoError(){
  locationError.innerText = "위치 정보가 없어요📍"
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function showAnimation(){
  const overflow =  citiWeatherContainer.querySelector(".weather-overflow");

  overflow.style.animation = "to-top 1s ease-in forwards";
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude,
  longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);


}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS)
  if(loadedCoords === null){
    askForCoords()
  } else{
    const parseCoords = JSON.parse(loadedCoords)
    getWeather(parseCoords.latitude, parseCoords.longitude)
  }
}

function init(){
  loadCoords()
}

init();
