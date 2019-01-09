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
