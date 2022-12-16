//Open Weather API
//{API key}
fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7c5174592c22f511659949315b1dc206')
  .then((response) => response.json())
  .then((data) => console.log(data));