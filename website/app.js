/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=e7882d553d7b100bd08be571fe82e9be";
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

//Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click",action);
function action(el){
    var insertZip = zip.value;
    var feeling = feelings.value;
    getWeather(baseURL,insertZip,apiKey).then((data)=>{
        postData("/post",{
            content : feeling,
            date : newDate,
            temp: data.main.temp
        })
    });
    updateUI();
}
/* Function to GET Project Data */
async function getWeather(baseURL,zip,api){
    const response = await fetch(baseURL+zip+api);
    try{
        const data = response.json();
        return data;
    }
    catch(err){
        console.log("Error :"+err);
    }
}
/* Function to POST data */
async function postData(url='',data={}){
    console.log(data);
    const response = await fetch(url,{
        method:'post',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newD = response.json();
        console.log(newD);
        return newD;
    }
    catch(err){
        console.log("Error :"+err);
    }
}
// function to update UI 
async function updateUI(){
    const request =await fetch("/get");
    try{
        const allData = await request.json();
        document.getElementById("date").innerHTML=`Date today is : ${newDate}`;
        document.getElementById("temp").innerHTML=`temp today is : ${allData[0].temp}`;
        document.getElementById("content").innerHTML=`feelings : ${feelings.value}`;
    }
    catch(err){
        console.log("Error :"+err);
    }
}
