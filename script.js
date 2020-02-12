let countDownDate = getCountDownDate();
setupCountDownDate();

const interval = setInterval(function (){
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    setupCountDownDate();
  } else {
    updateCountdownTime(days, hours, minutes, seconds);
  }

  setupSubtitle();
}, 1000);

function updateCountdownTime(days, hours, minutes, seconds){
  document.getElementById('countdown').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

function setupCountDownDate(){
  countDownDate = getCountDownDate();
}

function getCountDownDate(){
  const currentDate = new Date();
  const day = currentDate.getDay();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  if(day == 1){
    if((currentHour == 13 && currentMinute > 05) || (currentHour > 13 && currentHour < 16) || (currentHour == 16 && currentMinute < 40)){
      return getNextWorkshopEndDate();
    } else {
      if(currentHour >= 16){
        return getNextWorkshopStartDate(true);
      } else {
        return getNextWorkshopStartDate(false);
      }
    }
  } else if (day == 3) {
    if((currentHour == 13 && currentMinute > 55) || (currentHour > 13 && currentHour < 16) || (currentHour == 16 && currentMinute < 40)){
      return getNextWorkshopEndDate();
    } else {
      if(currentHour >= 16){
        return getNextWorkshopStartDate(true);
      } else {
        return getNextWorkshopStartDate(false);
      }
    }
  } else {
    return getNextWorkshopStartDate();
  }
}

function setupSubtitle(){
  if(countDownDate.getHours() == 16 && countDownDate.getMinutes() == 40){
    document.getElementById("subtitle").innerHTML = "Bis zum Ende der Werkstätte";
  } else {
    document.getElementById("subtitle").innerHTML = "Bis zur Werkstätte";
  }
}

function getNextWorkshopDay(){
  const currentDay = new Date().getDay();
  if(currentDay <= 3 && currentDay > 1){
    return "wed";
  } else {
    return "mon";
  }
}

function getNextWorkshopStartDate(excludeToday = false){
  const nextWorkshopDay = getNextWorkshopDay();
  const nextWorkshopDate = getNextDayOfTheWeek(nextWorkshopDay, excludeToday);

  nextWorkshopDate.setHours(13);
  if(nextWorkshopDay == "mon"){
    nextWorkshopDate.setMinutes(05);
  } else {
    nextWorkshopDate.setMinutes(55);
  }

  return nextWorkshopDate;
}

function getNextWorkshopEndDate(){
  const nextWorkshopDay = getNextWorkshopDay();
  const nextWorkshopDate = getNextDayOfTheWeek(nextWorkshopDay);

  nextWorkshopDate.setHours(16);
  nextWorkshopDate.setMinutes(40);

  return nextWorkshopDate;
}

function getNextDayOfTheWeek(dayName, excludeToday = false, refDate = new Date()) {
  const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                    .indexOf(dayName.slice(0,3).toLowerCase());
  if (dayOfWeek < 0) return;
  refDate.setHours(0,0,0,0);
  refDate.setDate(refDate.getDate() + !!excludeToday + 
                  (dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7);
  return refDate;
}
