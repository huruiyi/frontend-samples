//Task 1: create the distance object
var distances = {
    London_Paris: 286,
    London_Madrid: 1069,
    London_Berlin: 682,
    London_Amsterdam: 333,
    Berlin_Paris: 655,
    Berlin_Madrid: 1442,
    Berlin_Amsterdam: 407,
    Paris_Madrid: 791,
    Paris_Amsterdam: 316,
    Amsterdam_Madrid: 1099
};

//Task 2: create the calcDistance  function
var calcDistance = function(city1, city2){
    return distances[city1 + "_" + city2] || distances[city2 + "_" + city1];
};

//Task 3: create the cities array and the shuffle function
var cities = ["Paris", "Madrid", "Berlin", "Amsterdam"];

var shuffle = function(myArray){
    var result = [];
    //[1,2,3] []
    //[1,3] [2]
    //[3] [2,1]
    //[] [2,1,3]

    while(myArray.length > 0){

        //generate a random Index: randomIndex
        var randomIndex = Math.floor(myArray.length * Math.random());

        //add the element of index randomIndex to the result array and remove it from myArray
        result.push(myArray[randomIndex]);
        myArray.splice(randomIndex, 1);
    }

    return result;
};

//Task 4: create the generateTrip() function
var generateTrip = function(){

    //generate a random order of cities excluding London
    var trip = shuffle(cities);

    //Add London at the start
    trip.unshift("London");

    //Add London at the end
    trip.push("London");

    console.log(trip);

    var result = "";
    
    var totalMiles = 0;

    trip.forEach(function(element, index){
        if(index !== trip.length - 1){
            //calculate the distance between the current city and the next one
            var distance = calcDistance(element, trip[index + 1]);
            
            //update the result string
            result += element + " -> " + distance + " miles -> ";
            
            //update total miles
            totalMiles += distance;
        }else{
            result += element;
        }
    });

    console.log(result);
    console.log("Total distance to drive: " + totalMiles + " miles.");


};
generateTrip();
