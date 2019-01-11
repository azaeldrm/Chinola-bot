exports.startCountdown = function (seconds, msg) {

  var counter = seconds;
  var interval = setInterval(() => {

    // console.log(counter);
    if(counter <= 5 && counter > 0) {
      msg.channel.send(counter + ' seconds left!')
    }
    console.log(counter)
    counter--;
    if(counter < 0 ){

      // The code here will run when
      // the timer has reached zero.
      // When it reaches zero, it can return a boolean
      // To trigger another function, if that event function
      // is listening.

      clearInterval(interval);
      msg.channel.send('Time\'s up!')
      // console.log('Ding!');
    };
  }, 1000);

};

exports.weatherByCountry = function (country, msg) {

  var request = require('request');
  var config = require('./config');

  var param = {
    type: {
      'city': 'q',
      'cityID': 'id',
      'coord': [null,null]
      // 'coord': {
      //   'lat': null,
      //   'lon': null
      // }
    },
    city: 'London',
    api_key: config.api_key,
    url: 'https://api.openweathermap.org/data/2.5/weather'
  };

  var options = {
    url: `${param.url}?q=${param.city}&appid=${param.api_key}`,
    method: 'GET',
    json: true,
  };

  request(options, function (error, response, body) {
    console.log('\nstatusCode:', response && response.statusCode);
    console.log('')
    if (error) {
      console.log('error:', error);
    } else {
      // console.log(
      msg.channel.send(
  `Weather status in ${body.name}
  Weather forecast: ${body.weather[0].description}
  Temperature: ${(body.main.temp - 273.15).toFixed(2)}°C
  Humidity: ${(body.main.humidity)}`);
      // console.log('body:', body);
    }
  });

};
