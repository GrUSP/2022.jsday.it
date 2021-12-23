const countDownClock = (dateEvent) => {
  let number = 60;
  let format = 'days';

  // Get timestamps
  var unixTime = new Date(dateEvent).getTime();
  if (!unixTime) return;
  var now = new Date().getTime();

  // Calculate difference
  var difference = (unixTime / 1000) - (now / 1000);

  // Convert difference to absolute
  difference = Math.abs(difference);

  // Calculate time unit
  if (difference / (60 * 60 * 24) >= 1) {
    // Days
    format = 'days';
    number = difference / (60 * 60 * 24);
    difference = difference - number;
  }
  if (difference / (60 * 60) >= 1) {
    // Hours
    format = 'hours';
    number = difference / (60 * 60);
    difference = difference - number;
  }
  if (difference / 60 >= 1) {
    // Minutes
    format = 'minutes';
    number = difference / 60;
    difference = difference - number;
  }
  else {
    // Seconds
    format = 'seconds';
    number = difference;
  }

  const d = document;
  const daysElement = d.querySelector('.days');
  const hoursElement = d.querySelector('.hours');
  const minutesElement = d.querySelector('.minutes');
  const secondsElement = d.querySelector('.seconds');
  let countdown;
  convertFormat(format);

  function convertFormat(format) {
    switch (format) {
      case 'seconds':
        return timer(number);
      case 'minutes':
        return timer(number * 60);
      case 'hours':
        return timer(number * 60 * 60);
      case 'days':
        return timer(number * 60 * 60 * 24);
      }
  }

  function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        return;
      };

      displayTimeLeft(secondsLeft);

    }, 1000);
  }

  function displayTimeLeft(seconds) {
    daysElement.textContent = Math.floor(seconds / 86400);
    hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
    minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
    secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  }
}
