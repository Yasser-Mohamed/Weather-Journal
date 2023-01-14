// Creating a new date instance dynamically with JS
// global var
let d = new Date();
let newDate = d.toDateString();
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=e7882d553d7b100bd08be571fe82e9be";
const server = "http://localhost:4000";
// showing the error to the user
const error = document.getElementById("error");
// Event listener to add function to existing HTML DOM element
// Function called by event listener
const WeatherData = async (zip) => {
    try {
      const response = await fetch(baseURL+zip+apiKey);
      const data = await response.json();
      if (data.cod != 200) {
        error.innerHTML = data.message;
        setTimeout(_=> error.innerHTML = '', 2000)
        throw `${data.message}`;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  // Function to POST data
const postData = async (url = "", info = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(info)
       });
    try {
      const newData = await response.json();
      console.log(`You just saved`, newData);
      return newData;
    } catch (error) {
      console.log(error);
    }
  };
document.getElementById("generate").addEventListener("click", () => { 
    //get value after click on the button
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    // getWeatherData return promise
    WeatherData(zip).then((data) => {
      //making sure from the received data to execute rest of the steps
      if (data) {
        const {
          main: { temp },
          name: city,
          weather: [{ description }],
        } = data;
        const info = {
          newDate,
          city,
          temp: Math.round(temp), // to get integer number
          description,
          feelings,
        };
        postData(server + "/addAll", info);
        update();
        document.getElementById('entry').style.opacity = 1;
      }
    });
  });
  const update = async () => {
    const response = await fetch(server + "/getAll");
    try {
      const submiteDate = await response.json();
      document.getElementById("date").innerHTML = submiteDate.newDate;
      document.getElementById("city").innerHTML = submiteDate.city;
      document.getElementById("temp").innerHTML = submiteDate.main.temp+ '&degC';
      document.getElementById("description").innerHTML = submiteDate.weather.description;
      document.getElementById("content").innerHTML = submiteDate.feelings;
    } catch (error) {
      console.log(error);
    }
  };
