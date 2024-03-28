//create journey array
var journey = [
    {
        stop: "Manchester Piccadilly",
        min: 0
    },
    {
        stop: "Stockport",
        min: 11
    },
    {
        stop: "Wilmslow",
        min: 23
    },
    {
        stop: "Crewe",
        min: 29
    },
    {
        stop: "Stafford",
        min: 37
    },
    {
        stop: "Lichfield Trent Valley",
        min: 50
    },
    {
        stop: "Tamworth",
        min: 65
    },
    {
        stop: "Nuneaton",
        min: 80
    },
    {
        stop: "Rugby",
        min: 88
    },
    {
        stop: "Northampton",
        min: 103
    },
    {
        stop: "Milton Keynes Central",
        min: 111
    },
    {
        stop: "Watford Junction",
        min: 125
    },
    {
        stop: "London Euston",
        min: 140
    }

];

//Task 3: create the checkStations function
var checkStations = function(min){
    for(var i = 0; i < journey.length; i ++){
        if(min === journey[i].min){
            var calling = "Stopping at ";
            if(i === 0){
                calling = "Departing from ";
            }else if(i === journey.length - 1){
                calling = "Arriving to ";
            }
            console.log(calling + journey[i].stop + ".");
        }
    }
};

//Task 2: create a counter increasing by 1 every 100ms
var counter = 0;

var run = setInterval(function(){
    console.log(convertTime(counter));

    //check if the counter matches with a station stop time
    checkStations(counter);

    counter ++;
    if(counter === 141){
        clearInterval(run);
    }
}, 100);


//create the addZero function which adds a zero to minutes if under 10
var addZero = function(min){
    if(min < 10){
        return "0" + min;
    }else{
        return min;
    }
};


//the train departs from Manchester at 14:00
var convertTime = function(min){
    if(min < 60){
        return("14:" + addZero(min));
    }else if(min < 120){
        min -= 60;
        return("15:" + addZero(min));
    }else{
        min -= 120;
        return("16:" + addZero(min));
    }  
};
var convertTime2 = function(min){
    var departH = 14; 
    var departM = 0; 
    //departure time converted to minutes
    var departC = departH * 60 + departM;
    //output in minutes
    var convertedM = departC + min;
    //output in hh:mm
    var hours = Math.floor(convertedM/60);
    var minutes = convertedM % 60;
    return hours + ":" + addZero(minutes);
};



