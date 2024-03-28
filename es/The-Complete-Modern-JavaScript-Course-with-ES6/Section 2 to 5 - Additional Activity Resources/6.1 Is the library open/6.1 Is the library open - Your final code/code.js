//Task 0
//var myString = "1-2-3,4,5,6";

//Task 1:
var weekSchedule = {
    Mon: "9:30-17:00",
    Tue: "9:30-19:00",
    Wed: "9:30-19:00",
    Thu: "9:30-19:00",
    Fri: "9:30-17:00",
    Sat: "10:00-16:00",
    Sun: "11:00-16:00",
};

//Task 2:
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//if today is Monday, getWeekDay() returns 1 which is the index of Mon inside the days array
var getWeekDay = function(){
    
    //get the current date and time
    var currentTime = new Date();
    
    //get the day 
    return currentTime.getDay();
};

//Task 3:
var getTodaysSchedule = function(){
    //get the index of the week day inside the array days
    var index = getWeekDay();//ex: 1
    var day = days[index];//ex: 'Mon'
    return weekSchedule[day];
};
var todaysSchedule = getTodaysSchedule();

//Task 4:
var getTomorrowsSchedule = function(){
    //get the index of the week day inside the array days
    var index = getWeekDay() + 1;//ex: 2
    var day = days[index % 7];//ex: 'Tue'
    return weekSchedule[day];
};
var tomorrowSchedule = getTomorrowsSchedule();

//Task 5:
var convertSchedule = function(schedule){
    var openingHour = parseInt(schedule.split('-')[0].split(':')[0]);
    var openingMin = parseInt(schedule.split('-')[0].split(':')[1]);
    var closingHour = parseInt(schedule.split('-')[1].split(':')[0]);
    var closingMin = parseInt(schedule.split('-')[1].split(':')[1]);
    var result = {
        open: {
            hour: openingHour,
            min: openingMin
        },
        close: {
            hour: closingHour,
            min: closingMin
        }
    };
    return result;
};

//Task 6:
var addZero = function(x){
    if(x >= 10){
        return x;
    }else{
        return '0' + x;
    }
};

var isOpen = function(){
    
    //convert today's schedule to an object
    var todaysScheduleConverted = convertSchedule(todaysSchedule);
    
    //get the current time
    var currentTime = new Date();
    console.log(currentTime);
    
    //get the library opening time including the year, month, day, hour & min
    var openTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), todaysScheduleConverted.open.hour, todaysScheduleConverted.open.min);
    console.log(openTime);
    
    //get the library closing time including the year, month, day, hour & min
    var closeTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), todaysScheduleConverted.close.hour, todaysScheduleConverted.close.min);
    console.log(closeTime);
    
    if(currentTime >= openTime && currentTime <= closeTime){
        console.log("The library is open.")
    }else if(currentTime < openTime){
        console.log("The library is still closed. It will open at " + addZero(todaysScheduleConverted.open.hour) + ":" + addZero(todaysScheduleConverted.open.min));
    }else{
        console.log("The library has closed. Tomorrow's schedule is " + tomorrowSchedule + ".");
    }
};




