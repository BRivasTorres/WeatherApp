const cityWeather = document.getElementById("city");
const iconWeather = document.getElementById("icon");
const descriptionWeather = document.getElementById("description");
const tempWeather = document.getElementById("temp");
const humidityWeather = document.getElementById("humidity");
const speedWeather = document.getElementById("wind");
const searchButton = document.querySelector(".search button");
const searchBar = document.getElementById("search-bar");

let weather = {
	apiKey: "d78e28a97800a549c8cd9830ba4bcb20",
	fetchWeather: function (city) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		cityWeather.innerText = `Weather in ${name}`;
		iconWeather.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
		descriptionWeather.innerText = description;
		tempWeather.innerText = `${temp}°C`;
		humidityWeather.innerText = `Humidity: ${humidity}`;
		speedWeather.innerText = `Wind Speed: ${speed} km/h`;
		document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
	},
	search: function () {
		this.fetchWeather(searchBar.value);
	},
};

searchButton.addEventListener("click", () => {
	weather.search();
});

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		weather.search();
	}
});

weather.fetchWeather("Guatemala");
