//Open Weather API
const apiURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';

//{API key}
const apiURL2 = '&appid=7c5174592c22f511659949315b1dc206';

//empty array to fill user input for city
let city = [];


var userInput = document.getElementById('location').innerHTML;


let userSubmit = document.getElementsByClassName('submit button is-primary');

//handles click output
userSubmit[0].addEventListener('click', getFetch());


function getFetch() {

    localStorage.setItem('city', userInput);

    //city.push(userInput);
    localStorage.getItem("city", JSON.stringify(userInput));

    let completeAPI = apiURL1 + userInput + apiURL2;

        console.log('balls');
        console.log(completeAPI);
        
        fetch(completeAPI) 
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            localStorage.setItem('weatherResponse', JSON.stringify(data['list']));
        })
        
    return
}

