// const { json } = require("body-parser");

/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e7882d553d7b100bd08be571fe82e9be";
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", async function weather(){
    const url = `${baseURL}${zip.value}&appid=${apiKey}&units=metric`;
    const weather = getTemep(url);
    await sendData({
        // temp: weather.main.temp ,
        Date : newDate,
        feelings: feelings.value
    });
    getWeb()
})
/* Function to GET Project Data */
async function getTemep(url){
    const request = await fetch(url);
    try{
        const result = await request.json();
        return result;
    } catch(err){
        console.log(err);
    }
}
/* Function to POST data */
async function sendData(data){
    const request = await fetch("/addAll",{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const result = await request.JSON();
        return result;
    } 
    catch(err) {
        console.log(err);
    }
}
/* Function to GET Web API Data*/
async function getWeb(){
    const request = await fetch("/getAll");
    try{
        const result = await request.JSON();
        document.getElementById("date").innerHTML=`today is ${result.Date}`
        document.getElementById("temp").innerHTML=`temp today is ${result.temp}`
        document.getElementById("content").innerHTML=`feelings  ${result.feelings}`
    }
    catch(err){
        console.log(err);
    }
}