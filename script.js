const inputRef = document.querySelector('input[type="text"');
const hitRef = document.querySelector('.search-icon');
const cityRef = document.querySelector('.city');
const tempRef = document.querySelector('.temp');
const imgRef = document.querySelector('.weather-condition img');
const conditionRef = document.querySelector('.weather-condition p');
const timeRef = document.querySelector('.time');
const humidRef = document.querySelector('.humidity .hum-val');
const cloudRef = document.querySelector('.cloud .cloudy');
const backgroundRef = document.querySelector('body');
const meRef = document.querySelector('.me');

hitRef.addEventListener('click', function(event){
    console.log(inputRef.value);
    fetchData(inputRef.value);
});

inputRef.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        console.log(inputRef.value);
        hitRef.click();
    }
});

function fetchData(location){
    fetch(`https://api.weatherapi.com/v1/current.json?key=2d6f9e6e554e4a02a17182421240301&q=${location}&aqi=no`)
        .then(res => res.json())
        .then(data => getDetails(data))
        .catch(function(e){
            console.log(e);
        });
}

function getDetails(data){
    const city = data.location.name;
    const temp = data.current.temp_c;
    const weatherIcon = data.current.condition.icon;
    const condition = data.current.condition.text;
    const time = data.current.last_updated;
    const humid = data.current.humidity;
    const cloudy = data.current.cloud;

    cityRef.innerText = city;
    tempRef.innerText = temp + " °C";
    imgRef.src = weatherIcon;
    conditionRef.innerText = condition;
    timeRef.innerText = time;
    humidRef.innerText = humid + " %";
    cloudRef.innerText = cloudy+ " %";

    if(data.current.is_day === 1){
        backgroundRef.style.backgroundImage='url(./assets/morning.jpg)';
        meRef.style.color='black';
    }
    else{
        backgroundRef.style.backgroundImage='url(./assets/night.jpg)'
    }
}
