//create the robot object
var robot = {
    name: "Mars invader",
    coordinates: {
        x: 0,
        y: 0,
        z: 0
    }
};

//add the check method
robot.check = function(){
    
    //print the current position
    console.log("Robot position: x = " + this.coordinates.x + ", y = " + this.coordinates.y + ", z = " + this.coordinates.z + ".");
    
    //check if we reached the final destination which is: 4, 2, 3
    if(this.coordinates.x === 4 && this.coordinates.y === 2 && this.coordinates.z === 3){
        console.log("mission complete!");
    }
};

//add moveRight and moveLeft
robot.moveRight = function(){
    if(this.coordinates.x !== 10){
        this.coordinates.x ++;
    }
    this.check();
};
robot.moveLeft = function(){
    if(this.coordinates.x !== 0){
        this.coordinates.x --;
    }
    this.check();
};

//add moveForward and moveBackward
robot.moveForward = function(){
    if(this.coordinates.y !== 10){
        this.coordinates.y ++;
    }
    this.check();
};
robot.moveBackward = function(){
    if(this.coordinates.y !== 0){
        this.coordinates.y --;
    }
    this.check();
};

//add moveUp and moveDown
robot.moveUp = function(){
    if(this.coordinates.z !== 10){
        this.coordinates.z ++;
    }
    this.check();
};
robot.moveDown = function(){
    if(this.coordinates.z !== 0){
        this.coordinates.z --;
    }
    this.check();
};