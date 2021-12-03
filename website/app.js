/* Global Variables */
/* https://api.openweathermap.org/data/2.5/weather?q={ZIP CODE}&appid={API KEY}*/
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "8d6ecf08c8a4775015d0e215a48baf29"
let genBtn = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
genBtn.addEventListener('click', generateBtn);


function generateBtn (e) {
    e.preventDefault();
    const feelings = document.getElementById('feelings').value;
    getData(apiUrl, apiKey, document.getElementById('zip').value).then((allData) => {
        console.log(allData);
        postData('/post', {date: newDate, temp: allData.main.temp, content: feelings}).then(
            () => {
                viewData();
            }
        )
    })
}



const getData = async (apiUrl, apiKey) => {
    let zipCode = document.getElementById('zip').value;
    const resp = await fetch(`${apiUrl}?q=${zipCode}&appid=${apiKey}`);

    try {
        const allData = await resp.json();
        /*console.log(allData.main.temp);*/
        return allData;
    } catch (error) {
        console.log('ERROR:', error);
    }
}

const postData = async(url="", data={}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        //convert the values to JSON form
        body: JSON.stringify(data)
    })
     
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;

    } catch (error) {
        console.log(error);
    }
}

const viewData = async(newData) => {
    const req = await fetch('/allData');
    try {
        const allData = await req.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.log(error);
    }
}