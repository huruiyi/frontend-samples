//build the parent function

var parent = function(n){
    if(n === 0){
        return 1;
    }else if(n === 1){
        return 1;
    }else{
        return parent(n-1) + parent(n-2);
    }
};

//find the generation containing more than 1000 n-great grandparents

var numGParents = 0;
var currentGeneration = 0;

while(numGParents < 1000){
    //move to the next generation
    currentGeneration ++;
    
    //calculate numGParents
    numGParents = parent(currentGeneration);
}

console.log("The nearest generation containing more than 1000 n-grandparents is: generation number: " + currentGeneration + ".");