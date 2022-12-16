//Open Weather API
//{API key}
const apiURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const apiURL2 = '&appid=7c5174592c22f511659949315b1dc206';

let userSubmit = document.getElementsByClassName('submit button is-primary');

function getFetch() {

userInput = document.getElementById('location').value;
userLocation = JSON.stringify(userInput, 'replacer');

//userLocation = 'Cleveland'

completeURL = apiURL1 + userInput + apiURL2;



    console.log('balls');
    console.log(completeURL);
    
    fetch(completeURL) 
    .then((response) => response.json())
    .then((data) => console.log(data))
}

userSubmit[0].addEventListener('click', getFetch());