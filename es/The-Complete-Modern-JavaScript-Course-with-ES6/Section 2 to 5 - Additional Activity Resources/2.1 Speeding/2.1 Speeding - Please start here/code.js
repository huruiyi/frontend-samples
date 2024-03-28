//Speed limit: 50 miles/h

//Task 1: Store the speed limit (in miles/h) in a variable speedLimitMiles.
var speedLimitMiles = 50;
console.log(speedLimitMiles);

//Task 2: Calculate the speed limit in km/h and store it in a variable speedLimitKm. 
var speedLimitKm = speedLimitMiles * 1.61;
console.log(speedLimitKm);

//Task 3: Using JS arithmetic operations, calculate the minimum speed in miles/h which would result in a hefty fine and store it inside a variable  speedFineMiles.
var speedFineMiles = speedLimitMiles * 1.1 + 2;
console.log(speedFineMiles);

//Task 4: Using JS arithmetic operations, calculate the minimum speed in km/h which would result in a hefty fine and store it inside a variable  speedFineKm.
var speedFineKm = speedFineMiles * 1.61;
console.log(speedFineKm);
