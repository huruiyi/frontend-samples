//Create the totalVotes variable
var totalVotes = 0;

//create player1 and player2 objects
var player1 = {
    name: "Rafel Nadal",
    votes: 0
};
var player2 = {
    name: "Novak Djokovic",
    votes: 0
};

//build the vote function
function vote(player){
    player.votes ++;
    totalVotes ++;
}

//ask for votes
while(totalVotes < 10){
    //get the vote: 1 or 2
    var choice = prompt("To vote Rafael Nadal, type 1. To vote Novak Djokovic, type 2.");

    //1 -> Rafael, 2 -> Novak
    if(choice === '1'){
        vote(player1);
    }else if(choice === '2'){
        vote(player2);
    }
}

//Results:
console.log("Results:");
console.log("Rafael Nadal: " + player1.votes + " votes.");
console.log("Novak Djokovic: " + player2.votes + " votes.");

//who is the favourite to win?
if(player1.votes > player2.votes){
    console.log(player1.name + " is the favourite to win.");
}else if(player1.votes < player2.votes){
    console.log(player2.name + " is the favourite to win.");
}else{
    console.log("No favourite to win!");
}
