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

exports.weatherByRequest = function (input, msg) {

// In this example we need to automate the input (country, but needs to be
// changed to 'input', and use its information to determine which param.type
// it is, and from there adjust the url options accordingly.)

  var request = require('request');
  var config = require('./config');

  var param = {
    type: null,
    units: {
      type: 'imperial',
      symbol: 'F'
    },
    api_key: config.api_key,
    url: 'https://api.openweathermap.org/data/2.5/weather'
  };

  if (Number.isInteger(input) === false) {
    param.type = 'q';
  } else {
    param.type = 'zip';
  };

  var options = {
    url: `${param.url}?${param.type}=${input}&units=${param.units.type}&appid=${param.api_key}`,
    method: 'GET',
    json: true
  };

  request(options, function (error, response, body) {
    console.log('\nstatusCode:', response && response.statusCode);
    console.log('')
    if (error) {
      console.log('error:', error);
    } else {
      console.log(body)
      msg.channel.send(
  `Weather status in ${body.name}
  Weather forecast: ${body.weather[0].description}
  Temperature: ${body.main.temp.toFixed(2)}°${param.units.symbol}
  Humidity: ${(body.main.humidity)}`);
      // console.log('body:', body);
    }
  });

};
