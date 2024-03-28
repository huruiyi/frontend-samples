//Task 1: Create the room constructor
var room = function(capacity, price, number){
    this.capacity = capacity;
    this.price = price;
    this.number = number;
    this.booked = false;
};


//Task 2: add the info method to the room prototype
room.prototype.info = function(){
    console.log("Room number " + this.number + " is " + (this.booked ? "booked" : "vacant") + ". This room costs $" + this.price + " per night and can host up to " + this.capacity + (this.capacity > 1 ? " guests." : " guest."));
};

var room1 = new room(2, 50, 1);
var room2 = new room(1, 30, 2);
room1.info();
room2.info();

//Task 3: add the book method to the room prototype
room.prototype.book = function(){
    this.booked = true;
    console.log("Room number " + this.number + " has been booked.");
};
room1.book();
room1.info();

//Task 4: add the checkout method to the room prototype
room.prototype.checkout = function(){
    this.booked = false;
    console.log("Room number " + this.number + " has been checked out.");
};
room1.checkout();
room1.info();

//Task 5: add the changePrice method to the room prototype
room.prototype.changePrice = function(newPrice){
    var oldRoomPrice = this.price;
    var newRoomPrice = newPrice;
    this.price = newPrice;
    console.log("The price of room number " + this.number + " has changed from $" + oldRoomPrice + " to $" + newRoomPrice + ".");
};
room1.changePrice(59);
room1.info();

//Task 6: create room1, room2, room3 and hotel
room1 = new room(2, 50, 1);
room2 = new room(1, 30, 2);
var room3 = new room(2, 55, 3);

var hotel = {
    name: "Hilton town centre",
    stars: 5,
    rooms: [room1, room2, room3]
};

//Task 7: Add the info method to hotel
hotel.info = function(){
    console.log("Hotel info:")
    for(var i = 0; i < this.rooms.length; i ++){
        this.rooms[i].info();
    }
};
hotel.info();

//Task 8: Add the book method
hotel.book = function(guests){
    var roomFound = false;
    for(var i = 0; i < this.rooms.length; i ++){
        if(!this.rooms[i]["booked"] && this.rooms[i]["capacity"] >= guests){
            this.rooms[i].book();
            roomFound = true;
            break;
        }
    }
    if(!roomFound){
        console.log("Sorry, there are no rooms matching your query!");
    }

};

//Task 9: Add the checkout method to hotel
hotel.checkout = function(rNumber){
    for(var i = 0; i < this.rooms.length; i ++){
        if(rNumber === this.rooms[i]["number"]){
            this.rooms[i].checkout();
            break;
        }
    }
};