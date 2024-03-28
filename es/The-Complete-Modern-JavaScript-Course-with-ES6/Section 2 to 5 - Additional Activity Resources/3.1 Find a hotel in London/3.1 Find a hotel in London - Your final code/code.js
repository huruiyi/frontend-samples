//create the hotel objects
var hotel1 = {
    name: "Forest view Hotel",
    price: 51,
    distance: 6.8
};
var hotel2 = {
    name: "OYO Abbey Hotel",
    price: 52,
    distance: 3.7
};
var hotel3 = {
    name: "Camden Belmont",
    price: 69,
    distance: 2.8
};
var hotel4 = {
    name: "St Athans Hotel",
    price: 74,
    distance: 1.2
};
var hotel5 = {
    name: "St Giles London",
    price: 139,
    distance: 0.7
};
var hotel6 = {
    name: "Ashburn Hotel",
    price: 153,
    distance: 2.6
};

//create the hotels array
var hotels = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];

//create the result variable
var result = "Here is the list of available hotels:";
for(var i = 0; i < hotels.length; i ++){
    result += "\nHotel: " + hotels[i].name + ", price per night: £" + hotels[i].price + ", distance from centre: " + hotels[i].distance + " miles.";
}
//console.log(result);

//prompt the user to enter their budget
var budget = prompt("Please enter your budget per night:");
budget = parseFloat(budget);

//prompt the user to enter maximum distance from centre
var distance = prompt("Please enter the maximum distance from centre in miles:");
distance = parseFloat(distance);

//reset result
result = "";
var counter = 0; //number of hotels matching the search
for(var i = 0; i < hotels.length; i ++){
    if(hotels[i].price <= budget && hotels[i].distance <= distance){
        counter ++;
        result += "\nHotel: " + hotels[i].name + ", price per night: £" + hotels[i].price + ", distance from centre: " + hotels[i].distance + " miles.";
    }
}
if(counter === 0){
    result = "Sorry! There are no hotels matching your search."
}else if(counter === 1){
    result = "There is " + counter + " hotel matching your search:" + result;
}else{
    result = "There are " + counter + " hotels matching your search:" + result;
}
console.log(result);